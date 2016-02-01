module.exports = {
  beforeEach : function(browser) {
    browser //switch browser to mainpage before each test
      .url('localhost:5465')
      .waitForElementVisible('body', 1000)
      .click(".navbar-brand")
  },

  'Demo atl theme CFA' : function (browser) {
    browser //tests mainpage loading properly
      .assert.containsText('.lead', "We're a bunch of civic-minded technologists, designers, and topic experts using our skills to improve Example and the world")
  },

  'Mail list signup test' : function(browser){
    browser //tests signup button link
      .click("#mc-embedded-subscribe")
      .windowHandles(function(result) {
        var emailpage = result.value[1];
        browser.switchWindow(emailpage);
      })
      .waitForElementVisible('#subscribeFormWelcome', 5000)
      .assert.containsText('.masthead', "Website Signup")
  },

  'Slack test' : function(browser) {
    browser //tests slack frame link
      .waitForElementVisible('.__slackin', 5000)
      .pause(3000)
      .frame(0)
        .click(".slack-btn")
        .pause(3000)
        .windowHandles(function(result) {
          var slackpage = result.value[2];
          browser.switchWindow(slackpage);
        })
        .assert.title('Join sfbrigade on Slack!')
        .frame(null)
  },

  "navbar" : function(browser){
    browser
      .click('a[href="/events"]')
      .assert.elementPresent("#events-calendar")
      .click('a[href="/projects"]')
      .assert.containsText('.page-header', "All Projects")
      .click('a[href="/blog"]')
      .assert.containsText('.page-header', "Blog Posts")
      .click('a[href="/about"]')
      .assert.containsText('.page-header', "About Us")
  },

  after : function(browser) {
    //closes test browser
    browser.end();
  }
};