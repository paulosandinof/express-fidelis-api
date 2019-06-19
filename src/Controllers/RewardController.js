const voucherCodes = require("voucher-code-generator");

class RewardController {
  async index(req, res) {
    const { connection } = req;
    const { storeId } = req.params;
    try {
      const rewards = await connection.query(
        `SELECT * FROM Reward WHERE store_cnpj='${storeId}'`
      );

      return res.json(rewards);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async show(req, res) {
    const { connection } = req;
    const { storeId, id } = req.params;
    try {
      const rewards = await connection.query(
        `SELECT * FROM Reward WHERE store_cnpj='${storeId}' AND id='${id}'`
      );

      return res.json(rewards);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async store(req, res) {
    const { connection } = req;
    const { storeId } = req.params;
    const rewards = req.body;
    try {
      await connection.beginTransaction();

      await Promise.all(
        rewards.map(reward => {
          return connection.query(
            `INSERT INTO Reward (name, cost, store_cnpj) VALUES ('${
              reward.name
            }', '${reward.cost}', '${storeId}')`
          );
        })
      );

      await connection.commit();

      return res.json({ message: "Rewards created with success" });
    } catch (error) {
      await connection.rollback();

      return res.json({ message: `${error}` });
    }
  }
  async update(req, res) {
    const { connection } = req;
    const { storeId, id } = req.params;
    try {
      const reward = await connection.query(
        `UPDATE Reward
      SET name = '${req.body.name}', cost = '${
          req.body.cost
        }' WHERE store_cnpj='${storeId}' AND id='${id}';`
      );

      return res.json({
        message: "Reward updated with success",
        data: reward
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async destroy(req, res) {
    const { connection } = req;
    const { storeId, id } = req.params;
    try {
      const reward = await connection.query(
        `DELETE FROM Reward WHERE store_cnpj=${storeId} AND id=${id};`
      );

      res.json({
        message: "Reward deleted with success",
        data: reward
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
  async exchange(req, res) {
    const { connection } = req;
    const { storeId, id } = req.params;
    try {
      await connection.beginTransaction();

      const [cost, points] = await Promise.all([
        connection.query(
          `SELECT cost FROM Reward WHERE store_cnpj='${storeId}' AND id='${id}'`
        ),
        connection.query(
          `SELECT points, franchise_id FROM Point NATURAL JOIN Store WHERE cnpj='${storeId}'`
        )
      ]);

      //const cost = await ;

      //const points = await ;

      if (points[0].points < cost[0].cost) {
        throw new Error("Not enough points");
      }

      const updatedPoints = points[0].points - cost[0].cost;
      const voucher = voucherCodes.generate({
        length: 8,
        count: 1
      });

      await Promise.all([
        connection.query(
          `INSERT INTO Exchange VALUES('${req.body.cpf}', '${id}', '${
            voucher[0]
          }', '0')`
        ),
        connection.query(
          `UPDATE Point SET points='${updatedPoints}' WHERE franchise_id='${
            points[0].franchise_id
          }'`
        )
      ]);

      // await connection.query(
      //   `INSERT INTO Exchange VALUES('${req.body.cpf}', '${id}', '${
      //     voucher[0]
      //   }', '0')`
      // );

      // await connection.query(
      //   `UPDATE Point SET points='${updatedPoints}' WHERE franchise_id='${
      //     points[0].franchise_id
      //   }'`
      // );

      await connection.commit();

      return res.json({
        message: "Reward redeemed with success",
        data: voucher[0]
      });
    } catch (error) {
      await connection.rollback();
      return res.json({ message: `${error}` });
    }
  }
}

module.exports = new RewardController();
