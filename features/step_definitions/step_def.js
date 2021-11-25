'use strict';

const {setDefaultTimeout} = require('@cucumber/cucumber');
const { Given, When, Then } = require('@cucumber/cucumber');

var assert = require('assert');

const webdriver = require('selenium-webdriver');

const actions = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

const {until} = require('selenium-webdriver');

Given("I am in lloyeds bank site", function ss(next) {
  this.driver.get('https://www.lloydsbank.com/').then(next);
});

When("I click on Product and services",{timeout: 60 * 1000},function clickProSer(next) {
var winHandleBefore =this.driver.getWindowHandle();
this.driver.findElement(webdriver.By.xpath("//li[@class='with-nav2']")).click().then(next);
 //var winHandleBefore =this.driver.getWindowHandle();
this.driver.switchTo().parentFrame().then(next);
});

When("I click on Current Accounts", {timeout: 60 * 1000},function clickCurAcc(next) {
  this.driver.switchTo().parentFrame().then(next);
  this.driver.wait(until.titleIs('Products and Services | Lloyds Bank'), 10000);
  this.driver.switchTo().parentFrame().then(next);
  this.driver.close();
  this.driver.findElement(webdriver.By.linkText('Take a look at our range of accounts')).click().then(next); 
  //this.driver.switchTo().parentFrame().then(next);
});

Then ("I am landed in current accounts page", {timeout: 60 * 1000},function landedCurAcc(next) {
 // var winHandleBefore =this.driver.getWindowHandle();
//this.driver.switchTo().window(winHandleBefore);
  this.driver.switchTo().parentFrame().then(next);
  this.driver.wait(
  this.driver.findElement(webdriver.By.xpath("//h1[@class='header-text']")).isDisplayed(), 5000)
  this.driver.switchTo().parentFrame().then(next);
  this.driver.wait(until.titleIs('Open a Current Account Online | UK Bank Accounts | Lloyds Bank'), 10000);
  this.driver.getTitle().then(function (title) {
    assert.equal(title, "Open a Current Account Online | UK Bank Accounts | Lloyds Bank");
    return title;})
  });

  Then ("There are {int} current account in the page", {timeout: 60 * 1000},function CurAccNo(int) {
  var storeArr = [];
  this.driver.wait(until.titleIs('Open a Current Account Online | UK Bank Accounts | Lloyds Bank'), 10000)
  this.driver.findElement(webdriver.By.xpath("//div[@class='col-xs-12 col-sm-4 col-md-4 grid-col']")).then((arr)=>{arr.forEach((it)=>{console.log(it);
                storeArr.push(it)});
        });
    assert.equal(storeArr.length,int);     
  });

  Then ("the fees of platinum account is £{int} per month", {timeout: 60 * 1000},function feesPlatinum(int) {
    var storeArr = []; 
    this.driver.wait(until.titleIs('Open a Current Account Online | UK Bank Accounts | Lloyds Bank'), 10000)
    this.driver.findElement(webdriver.By.xpath("//span[@class='rte-body--large-text']")).then((arr)=>{
     arr.forEach((i)=>{console.log(i);
                  storeArr.push(i.getText())})})
     assert.equal(storeArr[2],int);
    });
          
