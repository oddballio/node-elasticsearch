require("dotenv").config();

const express = require("express");
const elasticsearch = require("elasticsearch");
const knex = require("knex");
const db = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "mysql"
  }
});

var client = new elasticsearch.Client({
  host: process.env.ELASTIC_HOST,
  log: "trace"
});

const app = express();

app.get("/", (req, res) => {
  return client.ping()
  .then(resp => {
  	return db.raw('select 1 + 1 as result')
  }).then(result => {
  	return res.json(result[0][0])
  }).catch(err => {
    res.json(err);
  });
});

app.listen(process.env.PORT || 3000);
