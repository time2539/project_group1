var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");
var queryize = require('queryize');


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
  await connection.end();
  res.send(row);
});

router.get("/api/userProfile", async function (req, res, next) {
  const connection = await mysql.createConnection(database);
  let sql = queryize.select()
  .from('user')
  .where({'user_id': req.body.user_id})
  .compile();
  const [profile] = await connection.query(sql.query,sql.data);
 await connection.end();
  res.send(profile);
});

router.post("/api/updateProfile", async function (req, res, next) {
  const connection = await mysql.createConnection(database);

  let sql = queryize.update()
  .table('user')
  .set({
    firstname : req.body.firstname,
    lastname : req.body.lastname
  })
  .where({'user_id' : req.body.user_id})
  .compile();
  const [profile] = await connection.query(sql.query,sql.data);
 await connection.end();
  res.send(profile);
});



module.exports = router;
