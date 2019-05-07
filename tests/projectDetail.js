module.exports = {
  "Profile did load"(browser) {
    browser.url("http://localhost:3000/projects/5373");
    browser.waitForElementVisible(".profile");
    browser.assert.visible(".profile");
  },
  "Owner name is preset"(browser) {
    browser.expect.element(".col-xs-12 p").text.to.not.equal("");
  }
};
