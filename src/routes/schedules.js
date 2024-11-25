const express = require("express");
const router = express.Router();
const { getScheduleByRestaurantId } = require("../controllers/schedule");

router.get("/schedules/:restaurantId", getScheduleByRestaurantId);

module.exports = router;