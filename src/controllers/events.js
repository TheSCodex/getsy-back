const Event = require('../models/Event.js');

const createEvent = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "The request body is missing one or more items" });
  }
  try {
    const newEvent = await Event.create({ name, description });
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Error creating event in the database" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ message: "Error fetching events from the database" });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      return res.status(200).json(event);
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ message: "Error fetching event from the database" });
  }
};

const updateEvent = async (req, res) => {
  const { name, description } = req.body;
  const updates = {};

  if (name) updates.name = name;
  if (description) updates.description = description;

  try {
    const [updated] = await Event.update(updates, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEvent = await Event.findByPk(req.params.id);
      return res.status(200).json(updatedEvent);
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({ message: "Error updating event in the database" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ message: "Error deleting event from the database" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
};