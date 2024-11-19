const express = require('express');
const controller = require('../controllers/reservations.js');

const reservationRoutes = express.Router();

reservationRoutes.get('/:userId/reservations', controller.getAllReservationsByUser);
reservationRoutes.get('/:userId/reservations/:id', controller.getReservationById);
reservationRoutes.post('/reservations/create', controller.createReservation);
reservationRoutes.put('/reservations/:id/update', controller.updateReservation);
reservationRoutes.delete('/reservations/:id/delete', controller.deleteReservation);
reservationRoutes.patch('/reservations/:id/update-status', controller.setReservationStatus);

module.exports = reservationRoutes;