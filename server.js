const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./src/routes/user.js');
const setupAssociations = require('./src/models/associations.js');
const Event = require('./src/models/Event.js');
const RestaurantEvent = require('./src/models/RestaurantEvent.js');
const Review = require('./src/models/Review.js');
const Schedule = require('./src/models/Schedule.js');
const Reservation = require('./src/models/Reservation.js');
const Restaurant = require('./src/models/Restaurant.js');
const User = require('./src/models/User.js');
const Role = require('./src/models/Role.js');
const restaurantRoutes = require('./src/routes/restaurant.js');
const reservationRoutes = require('./src/routes/reservations.js');
const eventRoutes = require('./src/routes/events.js');

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.use("/getsy-back", userRoutes, reservationRoutes, restaurantRoutes, eventRoutes);

setupAssociations();

const PORT = process.env.PORT;

async function syncTables() {
  try {
    await Role.sync();
    await User.sync();
    await Event.sync();
    await Restaurant.sync();
    await Schedule.sync();
    await Reservation.sync();
    await Review.sync();
    await RestaurantEvent.sync();
    console.log('All tables synced successfully.');
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
}

syncTables().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Unable to connect to the database", err);
});