class CustomerController {
  async dashboard(req, res) {
    const { connection } = req;
    try {
      const franchises = await connection.query(
        `SELECT franchise_name, score_percentage, points FROM Point NATURAL JOIN Franchise WHERE user_cpf='${
          req.body.cpf
        }'`
      );

      return res.json(franchises);
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
}

module.exports = new CustomerController();
