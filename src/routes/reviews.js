const express = require('express');
const reviewsController = require('../controllers/reviews');

const reviewsRoutes = express.Router();

reviewsRoutes.get('/reviews/', reviewsController.getAllReviews);
reviewsRoutes.get('/reviews/:id', reviewsController.getReviewById);
reviewsRoutes.post('/reviews/', reviewsController.createReview);
reviewsRoutes.put('/reviews/:id', reviewsController.updateReview);
reviewsRoutes.delete('/reviews/:id', reviewsController.deleteReview);
reviewsRoutes.get('/reviews/restaurant/:restaurantId', reviewsController.getReviewsByRestaurantId);
reviewsRoutes.get('/reviews/user/:userId', reviewsController.getReviewsByUserId);


module.exports = reviewsRoutes;
