class FranchiseController {
  async index(req, res) {
    const { connection } = req;
    try {
      const franchises = await connection.query("SELECT * FROM Franchise");

      return res.json(franchises);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }

  async show(req, res) {
    const { connection } = req;
    try {
      const id = await connection.query(
        `SELECT * FROM Franchise WHERE franchise_id='${req.params.id}'`
      );
      return res.json(id);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
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
        message: "Franchise created with success"
      });
    } catch (error) {
      await connection.rollback();

      return res.json({ message: `${error}` });
    }
  }

  async update(req, res) {
    const { connection } = req;
    try {
      const franchise = await connection.query(
        `UPDATE Franchise
      SET score_percentage = '${
        req.body.score_percentage
      }'  WHERE franchise_id='${req.params.id}';`
      );

      return res.json({
        message: "Franchise updated with success",
        data: franchise
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }

  async destroy(req, res) {
    const { connection } = req;
    try {
      const franchise = await connection.query(
        `DELETE FROM Franchise WHERE franchise_id=${req.params.id};`
      );

      res.json({
        message: "Franchise deleted with success",
        data: franchise
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
}

module.exports = new FranchiseController();
