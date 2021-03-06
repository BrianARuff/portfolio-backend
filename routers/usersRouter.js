const express = require("express");
const router = express.Router();
const { client, pool } = require("../database");
const uuidV4 = require("uuid/v4");

router.get("/:username/:password", (req, res) => {
  const { username, password } = req.params;
  // crypt & gen_salt function from pgcrypto
  pool
    .query(
      ` SELECT username, email, password FROM users 
        WHERE users.username = $1
        AND users.password = crypt($2, password)
      `,
      [username, password]
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
    .catch(err => res.status(500).json(err));
});

router.post("/newuser/:username/:password/:email", (req, res) => {
  const { username, password, email } = req.params;
  // created_at, updated_at, completed_at are set to default values via a custom trigger function desinged that updates the updated_at value.
  // status is set to by default to active... active is the standard account status... banned potentially be the name of the status for permanent or temporary removal of an account.
  if (username && password && email) {
    pool
      .query(
        `
      INSERT INTO users (email, password, username)
      VALUES (
        $1,
        crypt($2, gen_salt($3)),
        $4
      )
    `,
        [email, password, process.env.SALT, username]
      )
      .then(users => res.status(200).json(users.rowCount))
      .catch(err => res.status(500).json(err));
  }
});

router.get("/users", (req, res) => {
  var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
  console.log("IP ADDRESS", ip);

  pool
    .query(`select * from users`)
    .then(users => {
      const usersCount = users.rows.length;
      if (usersCount < 1 || !usersCount) {
        res.status(204).json({ usersFound: "No User Found" });
      } else {
        res.status(200).json({users: users.rows});
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete user by uuid

module.exports = router;
