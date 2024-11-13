const express = require('express');
const controller = require('../controllers/restaurant.js'); // Adjust the path as necessary

const restaurantRoutes = express.Router();

restaurantRoutes.get('/list-restaurants', controller.getAllRestaurants);
restaurantRoutes.get('/get-restaurant/:id', controller.getRestaurantById);
restaurantRoutes.post('/create-restaurant', controller.createRestaurant);
restaurantRoutes.put('/update-restaurant/:id', controller.updateRestaurant);
restaurantRoutes.delete('/delete-restaurant/:id', controller.deleteRestaurant);
restaurantRoutes.get('/restaurants/category/:category', controller.getRestaurantsByCategory);
restaurantRoutes.get('/restaurants/location/:zipCode', controller.getRestaurantsByLocation);
restaurantRoutes.get('/restaurants/price-range', controller.getRestaurantsByPriceRange);
restaurantRoutes.get('/restaurants/search', controller.searchRestaurants);
restaurantRoutes.get('/restaurants/admin/:adminId', controller.getRestaurantsByAdmin);

module.exports = restaurantRoutes;