class ReceiptController {
  async index(req, res) {
    const { connection } = req;
    try {
      const receipts = await connection.query(`SELECT * FROM Receipt`);
      return res.json(receipts);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async show(req, res) {
    const { connection } = req;
    const { id } = req.params;
    try {
      const receipt = await connection.query(`SELECT 
      receipt_id, date, price, cnpj, st.name as store_name, address, cpf, us.name as customer_name, bdate, gender, phone, email 
    FROM 
      Receipt, Store as st, User as us
    WHERE 
      cnpj=store_cnpj and cpf=user_cpf and receipt_id='${id}'`);

      return res.json(receipt);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async store(req, res) {
    const { connection } = req;
    const { products } = req.body;
    try {
      await connection.beginTransaction();

      await connection.query(
        `INSERT INTO Receipt VALUES('${req.body.receipt_id}', '${
          req.body.date
        }', '${req.body.price}', '${req.body.store_cnpj}', '${req.body.cpf}')`
      );

      await Promise.all(
        products.map(product => {
          return connection.query(
            `INSERT INTO Product VALUES('${product.name}', '${
              req.body.receipt_id
            }', '${product.qtd}', '${product.price}')`
          );
        })
      );

      // Pega as o id e a porcentagem da franquia
      const franchise_info = await connection.query(
        `SELECT franchise_id, score_percentage FROM Store NATURAL JOIN Franchise WHERE cnpj='${
          req.body.store_cnpj
        }'`
      );

      // Desestrutura o valor recebido da ultima query e calcula a quantidade
      // de pontos a ser adicionada ao usuário
      const { franchise_id, score_percentage } = franchise_info[0];
      const points = score_percentage * req.body.price;

      // Verifica se o usuário já fez alguma compra naquela franquia
      const user = await connection.query(
        `SELECT points FROM Point WHERE user_cpf='${
          req.body.cpf
        }' AND franchise_id='${franchise_id}'`
      );

      // Caso não tenha feito, é criado a tabela inicial com os pontos da nota atual, caso já exista
      // a quantidade de pontos é atualizado
      if (user[0]) {
        const newPoints = user[0].points + points;
        await connection.query(
          `UPDATE Point
        SET points = '${newPoints}' WHERE user_cpf='${
            req.body.cpf
          }' AND franchise_id='${franchise_id}';`
        );
      } else {
        await connection.query(
          `INSERT INTO Point VALUES('${
            req.body.cpf
          }', '${franchise_id}', '${points}')`
        );
      }

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
