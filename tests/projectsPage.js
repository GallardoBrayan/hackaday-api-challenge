module.exports = {
  "Table did load"(browser) {
    browser.url("http://localhost:3000");
    browser.waitForElementVisible("tbody td:nth-child(1)");
    browser.assert.visible("tbody td:nth-child(1)");
  },
  "Pagination did load"(browser) {
    browser.waitForElementVisible("nav");
    browser.assert.visible("nav");
  },
  "Click on a new page"(browser) {
    browser.waitForElementVisible("nav");
    browser.waitForElementVisible("nav li:last-child");
    browser.useXpath().click("//a[text()='Next']");
  }
};
