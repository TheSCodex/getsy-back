const express = require('express');
const controller = require('../controllers/reservations.js');

const reservationRoutes = express.Router();

reservationRoutes.get('/:fk_user/reservations/:id', controller.getAllReservationsByUser);
reservationRoutes.post('/:fk_user/reservations', controller.getReservationById);
reservationRoutes.post('/reservations/create', controller.createReservation);
reservationRoutes.post('/reservations/:id/update', controller.updateReservation);
reservationRoutes.delete('/reservations/:id/delete', controller.deleteReservation);
reservationRoutes.put('/reservations/:id/update-status', controller.setReservationStatus);
