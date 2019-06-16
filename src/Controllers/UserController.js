const bcrypt = require("bcryptjs");

class UserController {
  async index(req, res) {
    const { connection } = req;
    try {
      const users = await connection.query("SELECT * FROM User");
      return res.json(users);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }

  async show(req, res) {
    const { connection } = req;
    try {
      const user = await connection.query(
        `SELECT * FROM User WHERE cpf=${req.params.cpf}`
      );
      return res.json(user);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }

  async store(req, res) {
    const { connection } = req;
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      const user = await connection.query(
        `INSERT INTO User VALUES ('${req.body.cpf}', '${req.body.name}', '${
          req.body.bdate
        }', '${req.body.gender}', '${req.body.phone}', '${
          req.body.email
        }', '${hash}')`
      );

      return res.json({
        message: "User created with success",
        data: user
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }

  async update(req, res) {
    const { connection } = req;
    try {
      const user = await connection.query(
        `UPDATE User
      SET name = '${req.body.name}', bdate = '${req.body.bdate}', gender = '${
          req.body.gender
        }', phone = '${req.body.phone}', email = '${
          req.body.email
        }'  WHERE cpf='${req.params.cpf}';`
      );

      return res.json({
        message: "User updated with success",
        data: user
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }

  async destroy(req, res) {
    const { connection } = req;
    try {
      const user = await connection.query(
        `DELETE FROM User WHERE cpf=${req.params.cpf};`
      );

      res.json({
        message: "Success",
        data: user
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
}

module.exports = new UserController();
