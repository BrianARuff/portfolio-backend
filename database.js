require("dotenv").config({ debug: true });
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const { Pool, Client } = require("pg");
const connectionString = `postgresql::${username}:${password}@localhost:5432/portfolio`;

const pool = new Pool({
  connectionString: connectionString,
});

const client = new Client({
  connectionString: connectionString,
});

client.connect();
module.exports = {
  client,
  pool
};
