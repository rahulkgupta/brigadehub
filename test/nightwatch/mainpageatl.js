module.exports = {
  beforeEach : function(browser) {
    browser //switch browser to mainpage before each test
      .windowHandles(function(result) {
        var home = result.value[0];
        browser.switchWindow(home);
      })
      .url('localhost:5465')
      .waitForElementVisible('body', 1000)
      .click(".navbar-brand")
  },
  'Git Hub OAuth login test' : function (browser){
    browser //tests GitHub OAuth login
      .click("a[href='/login']")
      .click(".btn-github")
      .setValue("input#login_field", "testman444" )
      .setValue("input#password", "testtest123")
      .waitForElementVisible('.btn-block', 1000)
      .click('.btn-block')
  },
  'Logged-in dropdown menu links test' : function(browser){
    browser //cycles through dropdown menu links
      .click('.dropdown')
      .click("a[href='/account']")
      .assert.containsText('.page-header', "Profile Information")
      .click('.dropdown')
      .click("a[href='/blog/manage']")
      .assert.containsText('.page-header', "Manage Blog Posts")
      .click('.dropdown')
      .click("a[href='/projects/manage']")
      .assert.containsText('.page-header', "Manage Projects")
      .click('.dropdown')
      .click("a[href='/brigade']")
      .assert.containsText('.page-header', "Brigade Information")
  },
    'Account update test' : function(browser){
    browser //checks to make sure accounts update properly
      .click('.dropdown')
      .click("a[href='/account']")
      .clearValue("input#email")
      .clearValue("input#name")
      .clearValue("input#location")
      .clearValue("input#website")
      .setValue("input#email", "pizza123@pizza.com")
      .setValue("input#name", "pizzaman")
      .setValue("input#location", "pizza hut")
      .setValue("input#website", "www.pizzahut.com")
      .click('.btn-primary')
      .assert.value("input#name", "pizzaman")
      .assert.value("input#location", "pizza hut")
      .assert.value("input#website", "www.pizzahut.com")
      .assert.value("input#email", "pizza123@pizza.com")
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
      .closeWindow();
  },
  'Slack test' : function(browser) {
    browser //tests slack frame link
      .waitForElementVisible('.__slackin', 5000)
      .pause(1000)
      .frame(0)
        .click(".slack-btn")
        .pause(3000)
        .windowHandles(function(result) {
          var slackpage = result.value[1];
          browser.switchWindow(slackpage);
        })
        .assert.title('Join sfbrigade on Slack!')
        .frame(null)
      .closeWindow();
  },
  "navbar" : function(browser){
    browser //cyces through links in navbar
      .click('a[href="/events"]')
      .assert.elementPresent("#events-calendar")
      .click('a[href="/projects"]')
      .assert.containsText('.page-header', "All Projects")
      .click('a[href="/blog"]')
      .assert.containsText('.page-header', "Blog Posts")
      .click('a[href="/about"]')
      .assert.containsText('.page-header', "About Us")
  },
  'User logout test' : function(browser){
    browser //logs the user out successfully
      .click('.dropdown')
      .click("a[href='/logout']")
      .assert.containsText('ul.navbar-right li', "LOGIN")
  },
  after : function(browser) {
    //closes test browser
    browser.end();
  }
};