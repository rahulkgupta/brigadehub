var mongoose = require('mongoose')

var brigadeSchema = new mongoose.Schema({
  name: String,
  slug: String,
  heroImage: String,
  recoveryEmail: String,
  location: {
    general: String,
    specific: String,
    geo: String,
    timezone: {type: String, default: 'America/Los_Angeles'}
  },
  url: String,
  github: String,
  slack: {type: String, default: 'http://c4a.me/cfsfslack'},
  meetup: {type: String, default: 'Code-for-San-Francisco-Civic-Hack-Night'},
  theme: {
    slug: String,
    logo: String,
    page: {
      title: Boolean,
      events: Boolean,
      projects: Boolean,
      blog: Boolean,
      about: Boolean,
      login: Boolean,
      external: Array
    }
  },
  copy: {
    tagline: String,
    description: String
  },
  sponsors: {
    main: {
      name: String,
      url: String,
      image: String
    },
    other: Array
  },
  auth: {
    github: {
      clientId: String,
      clientSecret: String
    },
    slack: {
      clientId: String,
      clientSecret: String
    },
    meetup: {
      consumerKey: String,
      consumerSecret: String
    },
    google: {
      clientId: String,
      clientSecret: String
    },
    email: {
      user: String,
      password: String
    }
  },
  auditLog: Array
})

module.exports = mongoose.model('Brigade', brigadeSchema)
