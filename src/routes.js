const express = require("express");
const routes = express.Router();

const UserController = require("./Controllers/UserController");

routes.get("/user", UserController.index);
routes.post("/user", UserController.store);
routes.patch("/user/:cpf", UserController.update);

module.exports = routes;
