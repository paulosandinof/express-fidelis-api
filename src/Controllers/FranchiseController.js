const connection = require("../Config/database");

class FranchiseController {
  async index(req, res) {
    const { connection } = req;
    try {
      const franchises = await connection.query("SELECT * FROM Franchise");

      res.json(franchises);
    } catch (error) {
      return res.json({
        message: `${error}`
      });
    }
  }

  async show(req, res) {}

  async store(req, res) {
    const { connection } = req;
    try {
      await connection.beginTransaction();

      const manager = await connection.query(
        `INSERT INTO Manager VALUES ('${req.body.cpf}')`
      );

      const franchise = await connection.query(
        `INSERT INTO Franchise VALUES('${req.body.franchise_name}', '${
          req.body.score_percentage
        }')`
      );

      const fr_manager = await connection.query(
        `INSERT INTO Fr_manager VALUES('${req.body.cpf}', '${
          req.body.franchise_name
        }')`
      );

      await connection.commit();

      return res.json({
        message: "Success"
      });
    } catch (error) {
      await connection.rollback();

      return res.json(`${error}`);
    }
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = new FranchiseController();
