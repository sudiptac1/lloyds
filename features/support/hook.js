const {Before, After} = require('@cucumber/cucumber');
const seleniumWebdriver = require('selenium-webdriver');

Before(function() {
  return this.driver.manage().window().maximize();
});

After(function() {
  return this.driver.quit();
});