module.exports = {
  beforeEach : function(browser) {
    browser
      .windowHandles(function(result){
        var homepage = result.value[0]
        browser.switchWindow(homepage)
      })
  },
  'Demo atl theme CFA' : function (browser) {
    browser
      .url('localhost:5465')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.lead', "We're a bunch of civic-minded technologists, designers, and topic experts using our skills to improve Example and the world")

  },
  'Mail list signup test' : function(browser){
    browser
      .click("#mc-embedded-subscribe")
      .windowHandles(function(result) {
        browser.assert.equal(result.value.length, 2, 'There should be two windows open.');
        var emailpage = result.value[1];
        browser.switchWindow(emailpage);
      })
      .waitForElementVisible('#subscribeFormWelcome', 5000)
      .assert.containsText('.masthead', "Website Signup")
  },
  'Slack test' : function(browser) {
    browser
      .waitForElementVisible('.__slackin', 5000)
      .pause(3000)
      .frame(0)
        .click(".slack-btn")
        .pause(3000)
        .windowHandles(function(result) {
        browser.assert.equal(result.value.length, 3, 'There should be three windows open.');
        var mainpage = result.value[2];
        browser.switchWindow(mainpage);
      })
        .assert.title('Join sfbrigade on Slack!')
        .frame(null)
  },

  after : function(browser) {
    browser.end();
  }
};