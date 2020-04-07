var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");

/* GET users listing. */
router.get("/time", async function (req, res, next) {
  const connection = await mysql.createConnection(database);
  let sql = "select * from user";
  const [row] = await connection.query(sql);
  await connection.end();
  res.send(row);
});

router.get("/test", async function (req, res, next) {
  const connection = await mysql.createConnection(database);
  let sql = "select * from user";
  const [row] = await connection.query(sql);
  y;
  await connection.end();
  res.send(row);
});

module.exports = router;
