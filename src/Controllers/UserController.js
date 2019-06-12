const connection = require("../Config/database");

const bcrypt = require("bcryptjs");

class UserController {
  async index(req, res) {
    connection.query("SELECT * FROM User", (error, results, fields) => {
      if (error)
        return res.json({
          message: `${error}`
        });
      res.json(results);
    });
  }

  async show(req, res) {
    connection.query(
      `SELECT * FROM User WHERE cpf=${req.params.cpf}`,
      (error, results, fields) => {
        if (error)
          return res.json({
            message: `${error}`
          });
        res.json(results);
      }
    );
  }

  async store(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    connection.query(
      `INSERT INTO User VALUES ('${req.body.cpf}', '${req.body.name}', '${
        req.body.bdate
      }', '${req.body.gender}', '${req.body.phone}', '${
        req.body.email
      }', '${hash}')`,
      (error, results, fields) => {
        if (error)
          return res.json({
            message: `${error}`
          });
        res.json({
          message: "User inserted with success"
        });
      }
    );
  }

  async update(req, res) {
    connection.query(
      `UPDATE User
    SET name = '${req.body.name}', bdate = '${req.body.bdate}', gender = '${
        req.body.gender
      }', phone = '${req.body.phone}', email = '${
        req.body.email
      }'  WHERE cpf='${req.params.cpf}';`,
      (error, results, fields) => {
        if (error)
          return res.json({
            message: `${error}`
          });
        res.json({
          message: "User updated with success"
        });
      }
    );
  }

  async destroy(req, res) {
    connection.query(
      `DELETE FROM User WHERE cpf=${req.params.cpf};`,
      (error, results, fields) => {
        if (error)
          return res.json({
            message: `${error}`
          });
        res.json({
          message:
            results.affectedRows == 0
              ? "Register not found"
              : "Register removed with success"
        });
      }
    );
  }
}

module.exports = new UserController();
