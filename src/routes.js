const express = require("express");
const routes = express.Router();

const UserController = require("./Controllers/UserController");
const FranchiseController = require("./Controllers/FranchiseController");

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

module.exports = routes;
