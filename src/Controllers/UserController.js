const connection = require("../Config/database");

class UserController {
  async index(req, res) {
    connection.query("SELECT * FROM User", (error, results, fields) => {
      res.json(results);
    });
  }

  async show(req, res) {}

  async store(req, res) {
    connection.query(
      `INSERT INTO User VALUES ('${req.body.cpf}', '${req.body.name}', '${
        req.body.bdate
      }', '${req.body.gender}', '${req.body.phone}', '${req.body.email}', '${
        req.body.password
      }')`,
      (error, results, fields) => {
        if (!error)
          return res.json({
            message: `${error}`
          });
        res.json({
          message: "Success"
        });
      }
    );
  }

  async update(req, res) {
    console.log(req.params.cpf);
    connection.query(
      `UPDATE User
    SET name = '${req.body.name}', bdate = '${req.body.bdate}', gender = '${
        req.body.gender
      }', phone = '${req.body.phone}', email = '${
        req.body.email
      }'  WHERE cpf='${req.params.cpf}';`,
      (error, results, fields) => {
        console.log(error);
      }
    );
    res.end();
  }

  async destroy(req, res) {}
}

module.exports = new UserController();
