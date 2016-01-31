module.exports = {
  'Demo test Google' : function (browser) {
    browser
      .url('localhost:5465')
      .waitForElementVisible('body', 1000)
      .assert.containsText('.lead', "We're a bunch of civic-minded technologists, designers, and topic experts using our skills to improve Example and the world")
      .setValue('input#mce-EMAIL', "thisismyemail@testing.com")
      .click("#mc-embedded-subscribe")
      .windowHandles(function(result) {
        browser.assert.equal(result.value.length, 2, 'There should be two windows open.');
        var emailpage = result.value[1];
        browser.switchWindow(emailpage);
      })
      .waitForElementVisible('#subscribeFormWelcome', 3000)
      .end();
  }
};