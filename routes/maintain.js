var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");
var queryize = require('queryize');

router.get("/", async function (req, res, next) {
    const connection = await mysql.createConnection(database);
    let sql = queryize.select()
    .from('type')
    .compile();
    const [profile] = await connection.query(sql.query,sql.data);
   await connection.end();
    res.send(profile);
  });

module.exports = router;