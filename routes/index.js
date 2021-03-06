/*jslint node: true */
'use strict';

var app               = global.app,
    express           = global.express,
    googleAnalyticsId = global.nconf.get('GOOGLE_ANALYTICS_ID'),
    ua                = require('universal-analytics'),
    sample            = require('../controllers/sample');

// Heartbeat
app.get('/heartbeat', heartbeat);

// Add google analytics here
if (googleAnalyticsId) {
  app.use(ua.middleware(googleAnalyticsId, {}));
}

// Create routes
app.get('/', sample.index);

// 404 if no file or route is found
app.use(fileNotFound);

function heartbeat(req, res) {
  res.status(200).end();
}

function fileNotFound(req, res) {
  req.data.page = {
    id: 'error-404',
    title: 'File not found'
  };

  res.status(404).render('404', req.data);
}
