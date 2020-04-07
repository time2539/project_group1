var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise')
const database = require('../config/database')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10; 
/* GET users listing. */

// router.get('/time', async function(req, res, next) {
//   let username = 'user'
//   let password = 'user'
//   let firstname = 'tanapat'
//   let lastname = 'apiwongngam'
//   let role = 'user'
//   const salt = bcrypt.genSaltSync(saltRounds); 
//   const hash = bcrypt.hashSync(password, salt);

//   const connection = await mysql.createConnection(database)

//   let sql = `insert into user (username, password, role, firstname, lastname) values('${username}', '${hash}', '${role}','${firstname}', '${lastname}')`
//   await connection.query(sql)
//   await connection.end()
// });


router.post('/', async function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  try{
    const connection = await mysql.createConnection(database)
    let sql = `select * from user where username = '${username}'`
    let [row] = await connection.query(sql)
    await connection.end()
    const result = bcrypt.compareSync(password , row[0].password);
    let token = jwt.sign({ data: row[0].role }, 'secret', { expiresIn: 60 * 60 * 24 })
    if(result===true) {
      user = {
        access_token: token,
        username: row[0].username,
        firstname: row[0].firstname,
        lastname: row[0].lastname,
        role: row[0].role
      }
      return res.send(user)
    }
  } catch(e) {
    return res.status(401).send({
      message: 'user not found'
    })
  }

});

module.exports = router;