/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 571:
/***/ ((module) => {

// Description: This file contains the code for the distributions used in the action

// Map of distribution names to their create function 
const distributionMap = new Map([
  ["constant", createConstantDistribution],
  ["gaussian", createGaussianDistribution],
  ["normal", createGaussianDistribution],
  ["exponential", createExponentialDistribution],
  ["uniform", createUniformDistribution],
  ["poisson", createPoissonDistribution],
  ["bernoulli", createBernoulliDistribution],
  ["binomial", createBinomialDistribution],
  ["geometric", createGeometricDistribution],
  ["negativebinomial", createNegativeBinomialDistribution],
  ["hypergeometric", createHypergeometricDistribution],
  ["triangular", createTriangularDistribution],
  ["lognormal", createLogNormalDistribution],
  ["weibull", createWeibullDistribution],
  ["gamma", createGammaDistribution],
  ["erlang", createErlangDistribution],
  ["chisquare", createChiSquareDistribution],
  ["studentt", createStudentTDistribution],
  ["f", createFDistribution],
  ["exponentialpower", createExponentialPowerDistribution],
  ["loglogistic", createLogLogisticDistribution],
  ["pareto", createParetoDistribution],
  ["beta", createBetaDistribution]
]);


// Function that given a distribution name, returns the create function
function getDistributionCreateFunction(distributionName) {
  return distributionMap.get(distributionName.toLowerCase()) || null;
}




function getDistributionCreateFunction(distributionName) {
    switch (distributionName.toLowerCase()) {
      case "constant":
        return createConstantDistribution;
      case "gaussian":
      case "normal":
        return createGaussianDistribution;
      case "exponential":
        return createExponentialDistribution;
      case "uniform":
        return createUniformDistribution;
      case "poisson":
        return createPoissonDistribution;
      case "bernoulli":
        return createBernoulliDistribution;
      case "binomial":
        return createBinomialDistribution;
      case "geometric":
        return createGeometricDistribution;
      case "negativebinomial":
        return createNegativeBinomialDistribution;
      case "hypergeometric":
        return createHypergeometricDistribution;
      case "triangular":
        return createTriangularDistribution;
      case "lognormal":
        return createLogNormalDistribution;
      case "weibull":
        return createWeibullDistribution;
      case "gamma":
        return createGammaDistribution;
      case "erlang":
        return createErlangDistribution;
      case "chisquare":
        return createChiSquareDistribution;
      case "studentt":
        return createStudentTDistribution;
      case "f":
        return createFDistribution;
      case "exponentialpower":
        return createExponentialPowerDistribution;
      case "loglogistic":
        return createLogLogisticDistribution;
      case "pareto":
        return createParetoDistribution;
      case "beta":
        return createBetaDistribution;
      default:
        return null;
    }
  }

  module.exports = {
    getDistributionCreateFunction
  };

// Constant Distribution
function createConstantDistribution(value) {
    return function() {
      return value; // Always return the same value
    };
  }

// Gaussian (Normal) Distribution
function createGaussianDistribution(mean, standardDeviation) {
    return function() {
      let u = 0, v = 0;
      while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      return z * standardDeviation + mean;
    };
  }
  
  // Exponential Distribution
  function createExponentialDistribution(lambda) {
    return function() {
      return -Math.log(1.0 - Math.random()) / lambda;
    };
  }
  
  // Uniform Distribution
  function createUniformDistribution(min, max) {
    return function() {
      return Math.random() * (max - min) + min;
    };
  }
  
  // Poisson Distribution
  function createPoissonDistribution(lambda) {
    return function() {
      const L = Math.exp(-lambda);
      let k = 0, p = 1;
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      return k - 1;
    };
  }
  
  // Bernoulli Distribution
  function createBernoulliDistribution(p) {
    return function() {
      return Math.random() < p ? 1 : 0;
    };
  }
  
  // Binomial Distribution
  function createBinomialDistribution(n, p) {
    return function() {
      let successes = 0;
      for (let i = 0; i < n; i++) {
        if (Math.random() < p) {
          successes++;
        }
      }
      return successes;
    };
  }
  
  // Geometric Distribution
  function createGeometricDistribution(p) {
    return function() {
      return Math.floor(Math.log(1 - Math.random()) / Math.log(1 - p));
    };
  }
  
  // Negative Binomial Distribution
  function createNegativeBinomialDistribution(r, p) {
    return function() {
      let successes = 0;
      let failures = 0;
      while (successes < r) {
        if (Math.random() < p) {
          successes++;
        } else {
          failures++;
        }
      }
      return failures;
    };
  }
  
  // Poisson Distribution
  function createPoissonDistribution(lambda) {
    return function() {
      const L = Math.exp(-lambda);
      let k = 0, p = 1;
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      return k - 1;
    };
  }
  
  // Hypergeometric Distribution
  function createHypergeometricDistribution(N, K, n) {
    return function() {
      let successes = 0;
      for (let i = 0; i < n; i++) {
        if (Math.random() < K / N) {
          successes++;
          K--;
        }
        N--;
      }
      return successes;
    };
  }
  
  // Triangular Distribution
  function createTriangularDistribution(a, b, c) {
    return function() {
      const U = Math.random();
      const F = (c - a) / (b - a);
      if (U <= F) {
        return a + Math.sqrt(U * (b - a) * (c - a));
      } else {
        return b - Math.sqrt((1 - U) * (b - a) * (b - c));
      }
    };
  }
  
  // Log-Normal Distribution
  function createLogNormalDistribution(mean, standardDeviation) {
    return function() {
      const z = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
      return Math.exp(mean + standardDeviation * z);
    };
  }
  
  // Weibull Distribution
  function createWeibullDistribution(alpha, beta) {
    return function() {
      return alpha * Math.pow(-Math.log(Math.random()), 1 / beta);
    };
  }
  
  // Gamma Distribution
  function createGammaDistribution(k, theta) {
    return function() {
      let sum = 0;
      for (let i = 0; i < k; i++) {
        sum -= Math.log(Math.random());
      }
      return sum * theta;
    };
  }
  
  // Erlang Distribution
  function createErlangDistribution(k, lambda) {
    return function() {
      let sum = 0;
      for (let i = 0; i < k; i++) {
        sum -= Math.log(Math.random());
      }
      return sum / lambda;
    };
  }
  
  // Chi-Square Distribution
  function createChiSquareDistribution(k) {
    return function() {
      let sum = 0;
      for (let i = 0; i < k; i++) {
        const z = Math.sqrt(-2.0 * Math.log(Math.random())) * Math.cos(2.0 * Math.PI * Math.random());
        sum += z * z;
      }
      return sum;
    };
  }
  
  // Student's t-Distribution
  function createStudentTDistribution(df) {
    return function() {
      const z = Math.sqrt(df / createChiSquareDistribution(df - 1)());
      return createGaussianDistribution(0, 1)() / z;
    };
  }
  
  // F-Distribution
  function createFDistribution(d1, d2) {
    return function() {
      const x1 = createChiSquareDistribution(d1)();
      const x2 = createChiSquareDistribution(d2)();
      return (x1 / d1) / (x2 / d2);
    };
  }
  
  // Exponential Power Distribution
  function createExponentialPowerDistribution(lambda, alpha) {
    return function() {
      const u = Math.random();
      return (Math.pow(1 - u, -1 / alpha) - 1) / lambda;
    };
  }
  
  // Log-Logistic Distribution
  function createLogLogisticDistribution(alpha, beta) {
    return function() {
      const u = Math.random();
      return Math.pow((1 / u - 1), -1 / beta) / alpha;
    };
  }
  
  // Pareto Distribution
  function createParetoDistribution(alpha, xm) {
    return function() {
      const u = Math.random();
      return xm / Math.pow(1 - u, 1 / alpha);
    };
  }
  
  // Beta Distribution
  function createBetaDistribution(alpha, beta) {
    return function() {
      const x = createGammaDistribution(alpha, 1)();
      const y = createGammaDistribution(beta, 1)();
      return x / (x + y);
    };
  }
  

/***/ }),

/***/ 396:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(396);
const github = __nccwpck_require__(716);

// pattern to match the distribution and extract the family and the arguments
const DISTRIBUTION_PATTERN = /^(?<family>\w+)\((?<args>[^)]+)\)$/;

const { getDistributionCreateFunction } = __nccwpck_require__(571);

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
  core.setOutput("values", values);

} catch (error) {
  core.setFailed(error.message);
}
})();

module.exports = __webpack_exports__;
/******/ })()
;