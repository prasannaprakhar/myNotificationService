require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const notificationController = require('./controllers/notificatonController');

const app = express();
// const port = process.env.PORT || 6000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/send-notification', notificationController.getNotificationData);

app.post('/hello', notificationController.getHello);


// Health check
app.get('/', notificationController.healthCheck);

module.exports = app;