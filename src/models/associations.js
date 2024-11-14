const User = require("./User.js");
const Role = require("./Role.js");
const Restaurant = require("./Restaurant.js");
const Reservation = require("./Reservation.js");
const Review = require("./Review.js");
const Schedule = require("./Schedule.js");
const Event = require("./Event.js");
const RestaurantEvent = require("./RestaurantEvent.js");

function setupAssociations() {
  //USER-ROLE ASSOCIATION
  Role.hasMany(User, { foreignKey: "roleId" });
  User.belongsTo(Role, { foreignKey: "roleId" });

  //RESTAURANT-ADMIN ASSOCIATION
  Restaurant.belongsTo(User, { foreignKey: "adminId" });
  User.hasOne(Restaurant, { foreignKey: "adminId" });

  //RESTAURANT-RESERVATION ASSOCIATION
  Restaurant.hasMany(Reservation, { foreignKey: "restaurantId" });
  Reservation.belongsTo(Restaurant, { foreignKey: "restaurantId" });

  //RESERVATION-USER ASSOCIATION
  User.hasMany(Reservation, { foreignKey: "userId" });
  Reservation.belongsTo(User, { foreignKey: "userId" });

  //RESTAURANT-REVIEW ASSOCIATION
  Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
  Review.belongsTo(Restaurant, { foreignKey: "restaurantId" });

  //REVIEW-USER ASSOCIATION
  User.hasMany(Review, { foreignKey: "userId" });
  Review.belongsTo(User, { foreignKey: "userId" });

  //RESTAURANT-SCHEDULE ASSOCIATION
  Restaurant.hasMany(Schedule, { foreignKey: "restaurantId" });
  Schedule.belongsTo(Restaurant, { foreignKey: "restaurantId" });

  //RESTAURANT-EVENT ASSOCIATION
  Restaurant.belongsToMany(Event, {
    through: RestaurantEvent,
    as: "events",
    onDelete: "CASCADE",
  });
  Event.belongsToMany(Restaurant, {
    through: RestaurantEvent,
    as: "restaurants",
    onDelete: "CASCADE",
  });
}

module.exports = setupAssociations;
