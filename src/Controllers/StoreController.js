class StoreController {
  async index(req, res) {
    const { connection } = req;
    try {
      const stores = await connection.query("SELECT * FROM Store");
      return res.json(stores);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async show(req, res) {
    const { connection } = req;
    try {
      const store = await connection.query(
        `SELECT * FROM Store WHERE cnpj = '${req.params.id}'`
      );
      return res.json(store);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async store(req, res) {
    const { connection } = req;
    try {
      await connection.beginTransaction();

      const franchiseRows = await connection.query(
        `SELECT franchise_id FROM Franchise WHERE franchise_name='${
          req.body.franchise_name
        }'`
      );
      const franchise_id = franchiseRows[0].franchise_id;

      const store = await connection.query(
        `INSERT INTO Store VALUES('${req.body.cnpj}', '${req.body.name}', '${
          req.body.address
        }', '${franchise_id}')`
      );

      const frManagerRows = await connection.query(
        `SELECT * FROM Fr_manager WHERE user_cpf = ${req.body.cpf}`
      );

      if (!frManagerRows) {
        const St_manager = await connection.query(
          `INSERT INTO St_manager VALUES('${req.body.cnpj}', '${req.body.cpf}')`
        );
      }

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
      const store = await connection.query(
        `UPDATE Store
      SET name = '${req.body.name}', address = '${
          req.body.address
        }' WHERE cnpj='${req.params.id}';`
      );

      return res.json({
        message: "Store updated with success",
        data: store
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async destroy(req, res) {
    const { connection } = req;
    try {
      const store = await connection.query(
        `DELETE FROM Store WHERE cnpj=${req.params.id};`
      );

      res.json({
        message: "Store deleted with success",
        data: store
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
}

module.exports = new StoreController();
