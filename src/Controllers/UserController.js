const connection = require("../Config/database");

class UserController {
  async index(req, res) {
    connection.query("SELECT * FROM User", (error, results, fields) => {
      res.json(results);
    });
  }

  async show(req, res) {}

  async store(req, res) {
    console.log(req.body);

    connection.query(
      `INSERT INTO User VALUES ('${req.body.cpf}', '${req.body.name}', '${
        req.body.bname
      }', '${req.body.gender}', '${req.body.phone}', '${req.body.email}', '${
        req.body.password
      }')`,
      (error, results, fields) => {
        console.log("Erro:" + error);
        res.json(results);
        console.log("Fields:" + fields);
      }
    );
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = new UserController();
