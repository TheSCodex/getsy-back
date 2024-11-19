const Reservation = require('../models/Reservation.js');

const getReservationById = async (req, res) => {
    const { id: reservationId, userId } = req.params;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, userId: userId }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        return res.status(200).json(reservation);
    } catch (error) {
        console.error('Error while getting the reservation', error);
        return res.status(500).json({ error: 'Error while getting the reservation' });
    }
}
const getAllReservationsByUser = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'No user id was provided' });
    }

    const whereClause = { userId: userId };

    if (status) {
        whereClause.status = status;
    }

    try {
        const reservations = await Reservation.findAll({
            where: whereClause
        });

        return res.status(200).json(reservations);
    } catch (error) {
        console.error('Error while getting the reservations', error);
        return res.status(500).json({ error: 'Error while getting the reservations' });
    }
};

const createReservation = async (req, res) => {
    const { restaurantId, userId, eventId = null,  date, time, pax, status, notes = '' } = req.body;

    const requiredFields = { restaurantId, userId, date, time, pax, status };
    
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    try {
        const reservation = await Reservation.create({
            restaurantId, userId, eventId, date, time, pax, status, notes
        });

        return res.status(201).json(reservation);
    } catch (error) {
        console.error('Error while creating the reservation', error);
        return res.status(500).json({ error: 'Error while creating the reservation' });
    }
}

const updateReservation = async (req, res) => {
    const { id: reservationId } = req.params;
    const { userId, eventId, date, time, pax, status, notes } = req.body;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, userId: userId }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.update({
            userId: userId || reservation.userId,
            eventId: eventId || reservation.eventId,
            date: date || reservation.date,
            time: time || reservation.time,
            pax: pax || reservation.pax,
            status: status || reservation.status,
            notes: notes || reservation.notes
        });

        return res.status(200).json(reservation);
    } catch (error) {
        console.error('Error while updating the reservation', error);
        return res.status(500).json({ error: 'Error while updating the reservation' });
    }
}

const deleteReservation = async (req, res) => {
    const { id: reservationId } = req.params;
    const { userId } = req.body;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, userId: userId }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.destroy();

        return res.status(204).send();
    } catch (error) {
        console.error('Error while deleting the reservation', error);
        return res.status(500).json({ error: 'Error while deleting the reservation' });
    }
}

const setReservationStatus = async (req, res) => {
    const { id: reservationId } = req.params;
    const { status, userId } = req.body;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, userId: userId }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.update({ status });

        return res.status(200).json(reservation);
    } catch (error) {
        console.error('Error while updating the reservation status', error);
        return res.status(500).json({ error: 'Error while updating the reservation status' });
    }
}

module.exports = {
    getReservationById,
    getAllReservationsByUser,
    createReservation,
    updateReservation,
    deleteReservation,
    setReservationStatus
};