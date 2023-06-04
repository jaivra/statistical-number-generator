## Statistical Number Generator

A GitHub Action to generate random values from various probability distributions.

### Inputs

| Name          | Description                   | Default       
| ------------- | -------------                 | ------------- 
| distribution  | Distribution to use           | 
| count         | Number of values to generate  | 1

### Supported Distributions

The following distributions are currently supported:

- Constant Distribution: `constant(v)`
- Gaussian Distribution: `gaussian(mean, standardDeviation)`
- Normal Distribution: `normal(mean, standardDeviation)`
- Exponential Distribution: `exponential(rate)`
- Uniform Distribution: `uniform(min, max)`
- Poisson Distribution: `poisson(lambda)`
- Bernoulli Distribution: `bernoulli(probability)`
- Binomial Distribution: `binomial(trials, probability)`
- Geometric Distribution: `geometric(probability)`
- Negative Binomial Distribution: `negativebinomial(r, probability)`
- Hypergeometric Distribution: `hypergeometric(population, successes, draws)`
- Triangular Distribution: `triangular(low, mode, high)`
- Log-Normal Distribution: `lognormal(mean, standardDeviation)`
- Weibull Distribution: `weibull(shape, scale)`
- Gamma Distribution: `gamma(shape, scale)`
- Erlang Distribution: `erlang(shape, scale)`
- Chi-Square Distribution: `chisquare(degreesOfFreedom)`
- Student's t-Distribution: `studentt(degreesOfFreedom)`
- F-Distribution: `f(numeratorDegreesOfFreedom, denominatorDegreesOfFreedom)`
- Exponential Power Distribution: `exponentialpower(shape)`
- Log-Logistic Distribution: `loglogistic(location, scale)`
- Pareto Distribution: `pareto(scale, shape)`
- Beta Distribution: `beta(alpha, beta)`

To specify a distribution, use the expected format `<distribution>(<arg1>, <arg2>...)` as the value for the `distribution` input.

To add a new distribution, please follow the instructions provided below.

