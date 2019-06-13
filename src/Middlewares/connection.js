const connection = require("../Config/database");

const connectionMiddleware = async (req, res, next) => {
  try {
    req.connection = await connection;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = connectionMiddleware;
