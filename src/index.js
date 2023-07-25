const core = require('@actions/core');
const github = require('@actions/github');

// pattern to match the distribution and extract the family and the arguments
const DISTRIBUTION_PATTERN = /^(?<family>\w+)\((?<args>[^)]+)\)$/;

const { getDistributionCreateFunction } = require('./distributions.js');

// function that given a distribution string, match it with the pattern and return the family and the arguments
function parseDistribution(str, pattern) {
  const regex = new RegExp(pattern);
  const match = regex.exec(str);
  if (!match || !match.groups) {
    return null; // Pattern not found or no groups matched
  }
  const family = match.groups.family;
  //split the args by , to obtain a list
  const args = match.groups.args.split(',').map(Number);;
  return { family, args };
}

function convertStringToPositiveInt(str) {
  const num = parseInt(str, 10);
  return Number.isInteger(num) && num > 0 ? num : null;
}


try {
  // distribution
  const countValues = convertStringToPositiveInt(core.getInput('count'));
  const distribution = core.getInput('distribution');

  if (!countValues) {
    throw new Error('count must be a positive integer ' + typeof countValues);
  }

  const distr = parseDistribution(distribution, DISTRIBUTION_PATTERN);

  // Pattern not found or no groups matched
  if (!distr) { 
    throw new Error(`${distribution} distribution format not valid`);
  }

  const distributionType = distr['family']
  const args = distr['args'];

  const createProbFun = getDistributionCreateFunction(distributionType);

  // check if the distribution is valid with the right number of arguments
  if (!createProbFun) {
    throw new Error(`distribution ${distr['family']} is not recognized`);
  }
  if (args.length != createProbFun.length) {
    throw new Error(`distribution ${distr['family']} requires ${createProbFun.length} arguments, while ${args.length} were provided`);
  }

  const probFunc = createProbFun(...args);
  const values = countValues == 1 ? probFunc() : Array.from({ length: countValues }, (_, i) => probFunc());
  const tmp = "ciao";
  core.setOutput("values", values);

} catch (error) {
  core.setFailed(error.message);
}