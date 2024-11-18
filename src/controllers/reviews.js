const Review = require('../models/Review.js');

const createReview = async (req, res) => {
  const { restaurantId, userId, description, rating } = req.body;
  if (!restaurantId || !userId || !description || !rating) {
    return res.status(400).json({ message: "The request body is missing one or more items" });
  }
  try {
    const newReview = await Review.create({ restaurantId, userId, description, rating });
    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).json({ message: "Error creating review in the database" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Error fetching reviews from the database" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (review) {
      return res.status(200).json(review);
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).json({ message: "Error fetching review from the database" });
  }
};

const updateReview = async (req, res) => {
  const { restaurantId, userId, description, rating } = req.body;
  const updates = {};

  if (restaurantId) updates.restaurantId = restaurantId;
  if (userId) updates.userId = userId;
  if (description) updates.description = description;
  if (rating) updates.rating = rating;

  try {
    const [updated] = await Review.update(updates, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedReview = await Review.findByPk(req.params.id);
      return res.status(200).json(updatedReview);
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ message: "Error updating review in the database" });
  }
};

const deleteReview = async (req, res) => {
  try {
    const deleted = await Review.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ message: "Error deleting review from the database" });
  }
};

const getReviewsByRestaurantId = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { restaurantId: req.params.restaurantId }
    });
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this restaurant" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by restaurant ID:", error);
    return res.status(500).json({ message: "Error fetching reviews from the database" });
  }
};

const getReviewsByUserId = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.params.userId }
    });
    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this user" });
    }
    return res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews by user ID:", error);
    return res.status(500).json({ message: "Error fetching reviews from the database" });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByRestaurantId,
  getReviewsByUserId
};