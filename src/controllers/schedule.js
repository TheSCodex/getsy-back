const Schedule = require("../models/Schedule");

const getScheduleByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const schedule = await Schedule.findAll({
      where: { restaurantId },
    });
    if (schedule.length === 0) {
      return res.status(404).json({ message: "No schedules found for this restaurant" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving schedules", error });
  }
};

module.exports = {
  getScheduleByRestaurantId,
};