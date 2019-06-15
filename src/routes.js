const express = require("express");
const routes = express.Router();

const UserController = require("./Controllers/UserController");
const FranchiseController = require("./Controllers/FranchiseController");
const StoreController = require("./Controllers/StoreController");

// User routes
routes.get("/users", UserController.index);
routes.post("/user", UserController.store);
routes.get("/user/:cpf", UserController.show);
routes.patch("/user/:cpf", UserController.update);
routes.delete("/user/:cpf", UserController.destroy);

// TODO
// Para acessar essas rotas, é necessário estar logado

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

module.exports = routes;
