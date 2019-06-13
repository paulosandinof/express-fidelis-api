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

  async show(req, res) {
    const { connection } = req;
    const id = await connection.query(
      `SELECT franchise_id FROM Franchise WHERE franchise_name='MAGAZINE'`
    );
    console.log(id[0].franchise_id);
    res.end();
  }

  async store(req, res) {
    const { connection } = req;
    try {
      await connection.beginTransaction();

      await connection.query(
        `INSERT INTO Franchise (franchise_name, score_percentage) VALUES ('${
          req.body.franchise_name
        }', '${req.body.score_percentage}')`
      );

      const rows = await connection.query(
        `SELECT franchise_id FROM Franchise WHERE franchise_name='${
          req.body.franchise_name
        }'`
      );

      const franchise_id = rows[0].franchise_id;

      await connection.query(
        `INSERT INTO Fr_manager VALUES('${req.body.cpf}', '${franchise_id}')`
      );

      const store = await connection.query(`
        INSERT INTO Store Values('${req.body.cnpj}', '${req.body.name}', '${
        req.body.address
      }', '${franchise_id}')
      `);

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
