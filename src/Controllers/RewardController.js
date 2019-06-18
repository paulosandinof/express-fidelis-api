class RewardController {
  async index(req, res) {}
  async show(req, res) {}
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
  async update(req, res) {}
  async destroy(req, res) {}
}

module.exports = new RewardController();
