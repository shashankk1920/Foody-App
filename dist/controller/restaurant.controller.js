"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleRestaurant = exports.searchRestaurant = exports.updateOrderStatus = exports.getRestaurantOrder = exports.updateRestaurant = exports.getRestaurant = exports.createRestaurant = void 0;
const restaurant_model_1 = require("../models/restaurant.model");
const imageUpload_1 = __importDefault(require("../utils/imageUpload"));
const Order_model_1 = require("../models/Order.model");
const createRestaurant = async (req, res) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            });
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }
        const imageUrl = await (0, imageUpload_1.default)(file);
        await restaurant_model_1.Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });
        return res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createRestaurant = createRestaurant;
const getRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id }).populate('menus');
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                restaurant: [],
                message: "Restaurant not found"
            });
        }
        ;
        return res.status(200).json({ success: true, restaurant });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getRestaurant = getRestaurant;
const updateRestaurant = async (req, res) => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        ;
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);
        if (file) {
            const imageUrl = await (0, imageUpload_1.default)(file);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateRestaurant = updateRestaurant;
const getRestaurantOrder = async (req, res) => {
    try {
        const restaurant = await restaurant_model_1.Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        ;
        const orders = await Order_model_1.order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        return res.status(200).json({
            success: true,
            orders
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getRestaurantOrder = getRestaurantOrder;
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await Order_model_1.order.findById(orderId);
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        orders.status = status;
        await orders.save();
        return res.status(200).json({
            success: true,
            status: orders.status,
            message: "Status updated"
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
const searchRestaurant = async (req, res) => {
    try {
        const searchText = req.query.q || "";
        const selectedCuisines = (req.query.selectedCuisines || "")
            .split(",")
            .filter(cuisine => cuisine.trim() !== "");
        const query = {};
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { country: { $regex: searchText, $options: 'i' } },
                { cuisines: { $regex: searchText, $options: 'i' } },
            ];
        }
        if (selectedCuisines.length > 0) {
            query.cuisines = { $in: selectedCuisines };
        }
        const restaurants = await restaurant_model_1.Restaurant.find(query);
        return res.status(200).json({
            success: true,
            data: restaurants
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.searchRestaurant = searchRestaurant;
const getSingleRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const restaurant = await restaurant_model_1.Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { sort: { createdAt: -1 } } // Ensure sorting works correctly
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            });
        }
        return res.status(200).json({ success: true, restaurant });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getSingleRestaurant = getSingleRestaurant;
