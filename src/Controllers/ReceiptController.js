class ReceiptController {
  async index(req, res) {}
  async show(req, res) {}
  async store(req, res) {
    const { connection } = req;
    try {
      await connection.beginTransaction();

      const receipt = await connection.query(
        `INSERT INTO Receipt VALUES('${req.body.receipt_id}', '${
          req.body.date
        }', '${req.body.price}', '${req.body.cpf}', '${req.body.store_cnpj}')`
      );

      req.body.products.map(async product => {
        await connection.query(
          `INSERT INTO Product VALUES('${product.name}', '${
            req.body.receipt_id
          }', '${product.qtd}', '${product.price}')`
        );
      });

      await connection.commit();

      return res.json({
        message: "Receipt created with success"
      });
    } catch (error) {
      await connection.rollback();
      return res.json({ message: `${error}` });
    }
  }
  async update(req, res) {}
  async delete(req, res) {}
}

module.exports = new ReceiptController();
