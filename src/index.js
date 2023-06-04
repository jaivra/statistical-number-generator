// To generate dist file run ncc build src/index.js -o dist


const core = require('@actions/core');
const github = require('@actions/github');

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

const DISTRIBUTION_PATTERN = /^(?<family>\w+)\((?<args>[^)]+)\)$/;

try {
  // distribution
  const countValues = core.getInput('count');
  const distribution = core.getInput('distribution');

  const distr = parseDistribution(distribution, DISTRIBUTION_PATTERN);

  const distributionType = distr['family']
  const args = distr['args'];

  const probFunc = getDistributionCreateFunction(distributionType)(...args);
//probFunc = createGaussianDistribution(...args);


  const values = countValues == 1 ? probFunc() : Array.from({ length: countValues }, (_, i) => probFunc());

  core.setOutput("values", values);

  // Get the JSON webhook payload for the event that triggered the workflow
} catch (error) {
  core.setFailed(error.message);
}