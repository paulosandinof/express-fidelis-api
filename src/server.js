const express = require("express");
const routes = require("./routes");

const connectionMiddleware = require("./Middlewares/connection");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(connectionMiddleware);
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
