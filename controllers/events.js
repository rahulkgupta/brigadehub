var Events = require('../models/Events')
var moment = require('moment')
var uuid = require('node-uuid')
require('moment-timezone')

module.exports = {
  /**
   * GET /events
   * List of Event examples.
   */
  getEvents: function (req, res) {
    Events.find({}, function (err, foundEvents) {
      if (err) console.error(err)
      var userzone = moment.tz.guess()
      var mappedEvents = foundEvents.map(function (event) {
        event.convertedstart = moment.unix(event.start).tz(userzone).format('ha z MMMM DD, YYYY')
        event.localstart = moment.unix(event.start).tz(res.locals.brigade.location.timezone).format('ha z MMMM DD, YYYY')
        event.start = moment.unix(event.start).format()
        return event
      })
      res.render(res.locals.brigade.theme.slug + '/views/events/index', {
        events: mappedEvents,
        upcomingevents: mappedEvents.slice(0, 10),
        title: 'Events',
        brigade: res.locals.brigade
      })
    }).sort({start: 1})
  },
  /**
   * GET /events/manage
   * Manage Events.
   */
  getEventsManage: function (req, res) {
    Events.find({}, function (err, foundEvents) {
      if (err) console.error(err)
      var mappedEvents = foundEvents.map(function (event) {
        event.localstart = moment.unix(event.start).tz(res.locals.brigade.location.timezone).format('ha z MMMM DD, YYYY')
        return event
      })
      res.render(res.locals.brigade.theme.slug + '/views/events/manage', {
        title: 'Manage Events',
        allEvents: mappedEvents,
        brigade: res.locals.brigade
      })
    }).sort({start: 1})
  },
  /**
   * POST /events/manage
   * Update all Events.
   */
  postEventsManage: function (req, res) {
    res.redirect('Events/manage')
  },
  /**
   * GET /events/new
   * New Events.
   */
  getEventsNew: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/new', {
      title: 'New Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /events/new
   * Submit New Events.
   */
  postEventsNew: function (req, res) {
    var newEvent = new Events(req.body)
    newEvent.id = uuid.v1()
    newEvent.start = Date.parse(req.body.startday + req.body.startmonth + req.body.startyear + req.body.starthour + req.body.startminute) / 1000
    newEvent.end = Date.parse(req.body.endday + req.body.endmonth + req.body.endyear + req.body.endhour + req.body.endminute) / 1000
    newEvent.save(function (err) {
      if (err) console.error(err)
    })
    req.flash('success', {msg: 'Success! You have created an event.'})
    res.redirect('/events/new')
  },

  /**
   * GET /events/:eventID
   * Display Event by ID.
   */
  getEventsID: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/event', {
      eventID: req.params.eventID,
      title: 'Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * GET /events/:eventID/settings
   * IDSettings Events.
   */
  getEventsIDSettings: function (req, res) {
    Events.find({id: req.params.eventId}, function (err, foundEvent) {
      if (err) console.log(err)
      res.render(res.locals.brigade.theme.slug + '/views/events/settings', {
        event: foundEvent[0],
        title: 'Event Settings',
        start: moment.unix(foundEvent[0].start).tz(res.locals.brigade.location.timezone).format('MM-DD-YYYY HH:mm:ss'),
        end: moment.unix(foundEvent[0].end).tz(res.locals.brigade.location.timezone).format('MM-DD-YYYY HH:mm:ss'),
        brigade: res.locals.brigade
      })
    })
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSettings: function (req, res) {
    Events.find({id: req.params.eventId}, function (err, foundEvent) {
      if (err) console.log(err)
      var thisEvent = foundEvent[0]
      thisEvent.title = req.body.title
      thisEvent.location = req.body.location
      thisEvent.host = req.body.host
      thisEvent.start = moment.tz(req.body.start, 'MM-DD-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
      thisEvent.end = moment.tz(req.body.end, 'MM-DD-YYYY HH:mm:ss', res.locals.brigade.location.timezone).format('X')
      thisEvent.url = req.body.url
      thisEvent.description = req.body.description
      thisEvent.save(function (err) {
        if (err) console.log(err)
      })
      req.flash('success', {msg: 'Success! You have updated your event.'})
      res.redirect('/events/' + req.params.eventId + '/settings')
    })
  },
  /**
   * POST /events/sync
   * Sync Events.
   */
  postEventsSync: function (req, res) {
    var meetupid
    try {
      meetupid = res.locals.brigade.meetup.split('.com/')[1].replace(/\//g, '')
    } catch (err) {
      meetupid = ''
    }
    var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=' + meetupid + '&page=50'
    Events.fetchMeetupEvents(url).then(function (value) {
      req.flash('success', {msg: 'Success! You have successfully synced events from Meetup.'})
      res.redirect('/events/manage')
    }).catch(function (error) {
      req.flash('errors', {msg: error})
      res.redirect('/events/manage')
    })
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSync: function (req, res) {
    res.redirect('Events/' + req.params.eventID + '/settings')
  },
  /**
   * POST /events/:eventId/delete
   * Delete Events.
   */
  postDeleteEvent: function (req, res) {
    Events.remove({id: req.params.eventId}, function (err) {
      if (err) {
        console.log(err)
      }
      req.flash('success', {msg: 'Your event was deleted.'})
      res.redirect('/events/manage')
    })
  },
  /**
   * POST /events/:eventId/delete
   * Delete Events.
   */
  postDeleteAllEvents: function (req, res) {
    Events.remove({}, function (err) {
      if (err) {
        console.log(err)
      }
      req.flash('success', {msg: 'Your events were deleted.'})
      res.redirect('/events/manage')
    })
  }
}
