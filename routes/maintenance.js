var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");
const queryize = require("queryize");

const getType = async (req, res, next) => {
  try {
    const connection = mysql.createConnection(database);
    // let sql = queryize().select().from("type").compile();
    // console.log("sql :", sql);
    // const [row_type] = await connection.query(sql.query, sql.data);
    let sql = `select * from type`;
    const [row] = await connection.query(sql);
    await connection.end();
    return res.send({
      message: "success",
      result: row_type,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
      error: true,
    });
  }
};

router.get("/", getType);

module.exports = router;
