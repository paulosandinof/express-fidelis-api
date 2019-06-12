const connection = require("../Config/database");

class FranchiseController {
  async index(req, res) {}

  async show(req, res) {}

  //TODO
  // Substituir por uma transação caso dê tempo
  async store(req, res) {
    connection.query(
      `INSERT INTO Manager VALUES ('${req.body.cpf}')`,
      (error, results, fields) => {
        if (error)
          return res.json({
            message: `${error}`
          });
        connection.query(
          `INSERT INTO Franchise VALUES('${req.body.franchise_name}', '${
            req.body.score_percentage
          }')`,
          (error, results, fields) => {
            if (error)
              return res.json({
                message: `${error}`
              });
            connection.query(
              `INSERT INTO Fr_manager VALUES('${req.body.cpf}', '${
                req.body.franchise_name
              }')`,
              (error, results, fields) => {
                if (error)
                  return res.json({
                    message: `${error}`
                  });
                console.log(fields);
                console.log(results);
              }
            );
          }
        );
      }
    );
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

module.exports = new FranchiseController();
