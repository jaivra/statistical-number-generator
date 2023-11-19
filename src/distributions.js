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


// Function that given a distribution name, returns the create function for that distribution
function getDistributionCreateFunction(distributionName) {
  return distributionMap.get(distributionName.toLowerCase()) || null;
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
  