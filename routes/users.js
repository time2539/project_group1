var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");
var queryize = require('queryize');


/* GET users listing. */
router.post("/userProfile", async function (req, res, next) {
  const connection = await mysql.createConnection(database);
  let sql = queryize.select()
  .from('user')
  .where({'user_id': req.body.user_id})
  .compile();
  const [profile] = await connection.query(sql.query,sql.data);
  await connection.end();
  res.send(profile);
});

router.post("/updateProfile", async function (req, res, next) {
  const connection = await mysql.createConnection(database);

  let sql = queryize.update()
  .table('user')
  .set({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    address : req.body.address,
    phone : req.body.phone
  })
  .where({'user_id' : req.body.user_id}) 
  .compile();
  const [profile] = await connection.query(sql.query,sql.data);
 await connection.end();
  res.send({
      message: 'success',
      result: {
        user_id: req.body.user_id,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        address: req.body.address,
        phone: req.body.phone
      }
    });
});



module.exports = router;
