var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");
var queryize = require("queryize");

const getAllMaintain = async (req, res, next) => {
  try {
    const connection = await mysql.createConnection(database);
    let sql1 = queryize
      .select()
      .from("maintenance_noti", "m")
      .innerJoin("user", { alias: "u", on: { "m.create_by": "u.user_id" } })
      .columns(
        "m.maintenance_id",
        "m.created_at",
        "m.accept_at",
        "m.create_by",
        "u.firstname",
        "m.detail",
        "m.accept_by",
        "m.typeManage",
        "m.status"
      )
      .orderBy("m.maintenance_id")
      .compile();
    const [data] = await connection.query(sql1.query, sql1.data);

    let sql2 = queryize
      .select()
      .from("maintenance_noti", "m")
      .leftJoin("user", { alias: "u", on: { "m.accept_by": "u.user_id" } })
      .columns("m.accept_by", "u.firstname", "m.maintenance_id")
      .orderBy("m.maintenance_id")
      .compile();
    const [maintainer] = await connection.query(sql2.query, sql2.data);

    for (let i = 0; i < data.length; i++) {
      result = data[i];
      result.date_send = result.created_at;
      result.date_manage = result.accept_at;
      result.customer_id = result.create_by;
      result.customer_name = result.firstname;
      result.description = result.detail;
      if (result.accept_by == maintainer[i].accept_by) {
        result.admin_id = maintainer[i].accept_by;
        result.admin_name = maintainer[i].firstname;
      }
      result.type_manage = result.typeManage;

      delete result.created_at;
      delete result.accept_at;
      delete result.create_by;
      delete result.firstname;
      delete result.detail;
      delete result.accept_by;
      delete result.typeManage;
    }
    await connection.end();
    res.send({
      message: "success",
      result: data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
      error: true,
    });
  }
};

const getMaintain = async (req, res, next) => {
  try {
    const connection = await mysql.createConnection(database);
    let sql1 = queryize
      .select()
      .from("maintenance_noti", "m")
      .innerJoin("user", { alias: "u", on: { "m.create_by": "u.user_id" } })
      .columns(
        "m.maintenance_id",
        "m.created_at",
        "m.accept_at",
        "m.create_by",
        "u.firstname",
        "m.detail",
        "m.accept_by",
        "m.typeManage",
        "m.status"
      )
      .where({'m.create_by':req.params.id})
      .orderBy("m.maintenance_id")
      .compile();
    const [data] = await connection.query(sql1.query, sql1.data);

    let sql2 = queryize
      .select()
      .from("maintenance_noti", "m")
      .leftJoin("user", { alias: "u", on: { "m.accept_by": "u.user_id" } })
      .columns("m.accept_by", "u.firstname", "m.maintenance_id")
      .orderBy("m.maintenance_id")
      .compile();
    const [maintainer] = await connection.query(sql2.query, sql2.data);

    for (let i = 0; i < data.length; i++) {
      result = data[i];
      result.date_send = result.created_at;
      result.date_manage = result.accept_at;
      result.customer_id = result.create_by;
      result.customer_name = result.firstname;
      result.description = result.detail;
      if (result.accept_by == maintainer[i].accept_by) {
        result.admin_id = maintainer[i].accept_by;
        result.admin_name = maintainer[i].firstname;
      }
      result.type_manage = result.typeManage;

      delete result.created_at;
      delete result.accept_at;
      delete result.create_by;
      delete result.firstname;
      delete result.detail;
      delete result.accept_by;
      delete result.typeManage;
    }
    await connection.end();
    res.send({
      message: "success",
      result: data,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: error.message,
      error: true,
    });
  }
}
router.get("/", getAllMaintain);
router.get('/maintainuser/:id', getMaintain)

module.exports = router;
