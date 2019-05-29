const express = require("express");
const router = express.Router();
const {client, pool} = require("../database");

router.get("/:username/:password", (req, res) => {
  const { username, password } = req.params;
  // crypt & gen_salt function from pgcrypto
  pool
    .query(
      ` SELECT username, email, password FROM users 
        WHERE users.username = $1
        AND users.password = crypt($2, password)
      `, [username, password]
    )
    .then(user => {
      console.log("Users ==>", user.rows);
      const userCount = user.rows.length;
      if (userCount < 1) {
        res.status(204).json({ userFound: "No User Found" });
      } else {
        res.status(200).json(user.rows[0]);
      }
    })
    .catch(err => console.log(err));
});

router.get("/users", (req, res) => {
  pool
    .query(`select * from users`)
    .then(user => {
      const userCount = user.rows.length;
      if (userCount < 1 || !userCount) {
        res.status(204).json({ userFound: "No User Found" });
      } else {
        res.status(200).json(user.rows[0]);
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
