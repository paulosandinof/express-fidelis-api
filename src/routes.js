const express = require("express");
const routes = express.Router();

const UserController = require("./Controllers/UserController");
const FranchiseController = require("./Controllers/FranchiseController");
const StoreController = require("./Controllers/StoreController");
const ReceiptController = require("./Controllers/ReceiptController");
const RewardController = require("./Controllers/RewardController");

// User routes
routes.get("/users", UserController.index);
routes.post("/user", UserController.store);
routes.get("/user/:cpf", UserController.show);
routes.patch("/user/:cpf", UserController.update);
routes.delete("/user/:cpf", UserController.destroy);

// Franchise routes
routes.get("/franchises", FranchiseController.index);
routes.post("/franchise", FranchiseController.store);
routes.get("/franchise/:id", FranchiseController.show);
routes.patch("/franchise/:id", FranchiseController.update);
routes.delete("/franchise/:id", FranchiseController.destroy);

// Store routes
routes.get("/stores", StoreController.index);
routes.post("/store", StoreController.store);
routes.get("/store/:id", StoreController.show);
routes.patch("/store/:id", StoreController.update);
routes.delete("/store/:id", StoreController.destroy);

// Rewards routes
routes.get("/store/:storeId/rewards", RewardController.index);
routes.post("/store/:storeId/reward", RewardController.store);
routes.get("/store/:storeId/reward/:id", RewardController.show);
routes.patch("/store/:storeId/reward/:id", RewardController.update);
routes.delete("/store/:storeId/reward/:id", RewardController.destroy);

// Receipt routes
routes.get("/receipts", ReceiptController.index);
routes.post("/receipt", ReceiptController.store);
routes.get("/receipt/:id", ReceiptController.show);

module.exports = routes;
