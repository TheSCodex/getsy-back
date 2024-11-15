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
      category,
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

  try {
    const restaurant = await Restaurant.findByPk(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await restaurant.update({
      name: name || restaurant.name,
      phoneNumber: phoneNumber || restaurant.phoneNumber,
      email: email || restaurant.email,
      address: address || restaurant.address,
      minPrice: minPrice || restaurant.minPrice,
      maxPrice: maxPrice || restaurant.maxPrice,
      zipCode: zipCode || restaurant.zipCode,
      capacity: capacity || restaurant.capacity,
      category: category || restaurant.category,
      logo: logo || restaurant.logo,
      banner: banner || restaurant.banner,
      adminId: adminId || restaurant.adminId,
    });

    return res.status(200).json(restaurant);
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
      return res.status(204).json({message: "Restaurant deleted successfully"});
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
    const { minPrice, maxPrice } = req.body;
    try {
      const restaurants = await Restaurant.findAll({
        where: {
          minPrice: minPrice,
          maxPrice: maxPrice
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
    const { name, address, category } = req.query;
    try {
      const restaurants = await Restaurant.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${name}%` } },
            { address: { [Op.like]: `%${address}%` } },
            { category: { [Op.like]: `%${category}%` } }
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
