const Reservation = require('../models/Reservation.js');

const getReservationById = async (req, res) => {
    const { id: reservationId, fk_user } = req.params;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, fk_user: fk_user }
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
    const { fk_user } = req.params;
    const { status } = req.query;

    if (!fk_user) {
        return res.status(400).json({ error: 'No user id was provided' });
    }

    const whereClause = { fk_user: fk_user };

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
    const { fk_restaurant, fk_user, fk_event = '',  date, time, pax, status, notes = '' } = req.body;

    const requiredFields = { fk_restaurant, fk_user, date, time, pax, status };
    
    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            return res.status(400).json({ error: `Missing required field: ${field}` });
        }
    }

    try {
        const reservation = await Reservation.create({
            fk_restaurant, fk_user, fk_event, date, time, pax, status, notes
        });

        return res.status(201).json(reservation);
    } catch (error) {
        console.error('Error while creating the reservation', error);
        return res.status(500).json({ error: 'Error while creating the reservation' });
    }
}

const updateReservation = async (req, res) => {
    const { id: reservationId } = req.params;
    const { fk_restaurant, fk_user, fk_event, date, time, pax, status, notes } = req.body;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, fk_user: fk_user }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.update({
            fk_restaurant: fk_restaurant || reservation.fk_restaurant,
            fk_user: fk_user || reservation.fk_user,
            fk_event: fk_event || reservation.fk_event,
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
    const { fk_user } = req.body;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, fk_user: fk_user }
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
    const { status, fk_user } = req.body;

    if (!reservationId) {
        return res.status(400).json({ error: 'No id was provided for the reservation' });
    }

    try {
        const reservation = await Reservation.findOne({
            where: { id: reservationId, fk_user: fk_user }
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