const Restaurant = require("../models/Restaurant.js");
const { Op } = require('sequelize');

const createRestaurant = async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    address,
    minPrice,
    maxPrice,
    zipCode,
    capacity,
    category,
    logo,
    banner,
    adminId,
  } = req.body;
  if (
    !name ||
    !phoneNumber ||
    !email ||
    !address ||
    !minPrice ||
    !maxPrice ||
    !zipCode ||
    !capacity ||
    !category ||
    !adminId
  ) {
    return res
      .status(400)
      .json({ message: "The request body is missing one or more items" });
  }
  const existingRestaurant = await Restaurant.findOne({ where: { email } });
  if (existingRestaurant) {
    return res
      .status(409)
      .json({ message: "Restaurant with this email already exists" });
  }
  try {
    const newRestaurant = await Restaurant.create({
      name,
      phoneNumber,
      email,
      address,
      minPrice,
      maxPrice,
      zipCode,
      capacity,
      category: category.join(","),
      logo,
      banner,
      adminId,
    });
    return res.status(201).json(newRestaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return res
      .status(500)
      .json({ message: "Error creating restaurant in the database" });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    if (restaurants.length === 0) {
      return res.status(404).json({ message: "No restaurants found" });
    }
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res
      .status(500)
      .json({ message: "Error fetching restaurants from the database" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (restaurant) {
      return res.status(200).json(restaurant);
    } else {
      return res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res
      .status(500)
      .json({ message: "Error fetching restaurant from the database" });
  }
};

const updateRestaurant = async (req, res) => {
  const {
    name,
    phoneNumber,
    email,
    address,
    minPrice,
    maxPrice,
    zipCode,
    capacity,
    category,
    logo,
    banner,
    adminId,
  } = req.body;
  if (
    !name ||
    !phoneNumber ||
    !email ||
    !address ||
    !minPrice ||
    !maxPrice ||
    !zipCode ||
    !capacity ||
    !category ||
    !adminId
  ) {
    return res
      .status(400)
      .json({ message: "At least one item is necessary to update" });
  }
  const updates = {};
  if (name) updates.name = name;
  if (phoneNumber) updates.phoneNumber = phoneNumber;
  if (email) updates.email = email;
  if (address) updates.address = address;
  if (minPrice) updates.minPrice = minPrice;
  if (maxPrice) updates.maxPrice = maxPrice;
  if (zipCode) updates.zipCode = zipCode;
  if (capacity) updates.capacity = capacity;
  if (category) updates.category = category.join(",");
  if (logo) updates.logo = logo;
  if (banner) updates.banner = banner;
  if (adminId) updates.adminId = adminId;
  try {
    const [updated] = await Restaurant.update(updates, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRestaurant = await Restaurant.findByPk(req.params.id);
      return res.status(200).json(updatedRestaurant);
    } else {
      return res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return res
      .status(500)
      .json({ message: "Error updating restaurant in the database" });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      return res.status(204).json();
    } else {
      return res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    return res
      .status(500)
      .json({ message: "Error deleting restaurant from the database" });
  }
};

const getRestaurantsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
      const restaurants = await Restaurant.findAll({
        where: {
          category: {
            [Op.like]: `%${category}%`
          }
        }
      });
      if (restaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found in this category" });
      }
      return res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants by category:", error);
      return res.status(500).json({ message: "Error fetching restaurants from the database" });
    }
  };
  
  const getRestaurantsByLocation = async (req, res) => {
    const { zipCode } = req.params;
    try {
      const restaurants = await Restaurant.findAll({
        where: { zipCode }
      });
      if (restaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found in this location" });
      }
      return res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants by location:", error);
      return res.status(500).json({ message: "Error fetching restaurants from the database" });
    }
  };
  
  const getRestaurantsByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    try {
      const restaurants = await Restaurant.findAll({
        where: {
          minPrice: { [Op.gte]: minPrice },
          maxPrice: { [Op.lte]: maxPrice }
        }
      });
      if (restaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found in this price range" });
      }
      return res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants by price range:", error);
      return res.status(500).json({ message: "Error fetching restaurants from the database" });
    }
  };
  
  const searchRestaurants = async (req, res) => {
    const { query } = req.query;
    try {
      const restaurants = await Restaurant.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { address: { [Op.like]: `%${query}%` } },
            { category: { [Op.like]: `%${query}%` } }
          ]
        }
      });
      if (restaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found matching the search criteria" });
      }
      return res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error searching restaurants:", error);
      return res.status(500).json({ message: "Error searching restaurants in the database" });
    }
  };
  
  const getRestaurantsByAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
      const restaurants = await Restaurant.findAll({
        where: { adminId }
      });
      if (restaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found for this admin" });
      }
      return res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants by admin:", error);
      return res.status(500).json({ message: "Error fetching restaurants from the database" });
    }
  };

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantsByCategory,
  getRestaurantsByLocation,
  getRestaurantsByPriceRange,
  searchRestaurants,
  getRestaurantsByAdmin
};
