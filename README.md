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



## Usage

To generate five values from a normal distribution with a mean of 10 and a standard deviation of 2, and print them, you can use the following example:

```yaml
# Job to generate five values from a normal distribution
five-normal-values-job:
  runs-on: ubuntu-latest
  name: Generator of 5 values from a normal distribution with mean 10 and standard deviation 2
  steps:
    # Step to check out the repository
    - name: Checkout
      uses: actions/checkout@v3
    
    # Step to generate distribution values
    - name: Distribution Value Generator
      uses: ./
      id: distribution_value_generator
      with:
        distribution: 'normal(10, 2)'
        count: 5
    
    # Step to print the generated values
    - name: Print the generated values
      run: echo "Generated values = ${{ steps.distribution_value_generator.outputs.values }}"
```

## Add a new distribution

To add a new distribution with 'n' parameters, you can easily modify the `distributions.js` file. Specifically, you need to add an entry to the `distributionMap` map, using the tuple `(distributionName, funcToCreateDistribution)`.

The `funcToCreateDistribution` function accepts 'n' arguments representing the parameters of the distribution. It should return a function that, when called, generates and returns a new value from the specified distribution.

To understand how to implement this, you can refer to the existing functions in the file, which demonstrate the pattern. Please follow the same structure and approach when adding your new distribution function.

Feel free to experiment and extend the available distributions by adding your own custom ones according to your specific requirements.