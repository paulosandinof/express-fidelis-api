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
}

module.exports = new RewardController();
