const express = require('express');
const eventController = require('../controllers/events.js');

const eventRoutes = express.Router();

eventRoutes.get('/event', eventController.getAllEvents);
eventRoutes.get('/event/:id', eventController.getEventById);
eventRoutes.post('/event/create', eventController.createEvent);
eventRoutes.put('/event/update/:id', eventController.updateEvent);
eventRoutes.delete('/event/:id', eventController.deleteEvent);

module.exports = eventRoutes;