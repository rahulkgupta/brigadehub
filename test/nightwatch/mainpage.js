module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('localhost:5465')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.lead', "We're a bunch of civic-minded technologists, designers, and topic experts using our skills to improve Example and the world")
      .end();
  }
};