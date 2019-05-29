require("dotenv").config({ debug: true });
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const { Pool, Client } = require("pg");
const connectionString = `postgresql::${username}:${password}@localhost:5432/portfolio`;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || connectionString
});

const client = new Client({
  connectionString: process.env.DATABASE_URL || connectionString
});

client.connect();
module.exports = {
  client,
  pool
};
