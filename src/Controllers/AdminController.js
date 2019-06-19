class AdminController {
  async login(req, res) {}
  async dashboard(req, res) {}
  async validateCoupon(req, res) {
    const { connection } = req;
    try {
      const voucher = await connection.query(
        `SELECT coupon, redeemed FROM ((Exchange JOIN Reward ON reward_id=id) JOIN Store ON store_cnpj=cnpj) WHERE user_cpf='${
          req.body.cpf
        }' AND franchise_id='${req.body.franchise_id}' AND coupon='${
          req.body.coupon
        }'`
      );

      if (!voucher[0]) {
        throw new Error("Coupon not found");
      }
      if (voucher[0].redeemed === 1) {
        throw new Error("Coupon already redeemed");
      }

      await connection.query(
        `UPDATE Exchange SET redeemed=1 WHERE coupon='${voucher[0].coupon}'`
      );

      return res.json({
        message: "Exchange made with success"
      });
    } catch (error) {
      return res.json({ message: `${error}` });
    }
  }
}

module.exports = new AdminController();
