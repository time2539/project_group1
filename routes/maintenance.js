var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");
const queryize = require("queryize");
var multer = require("multer");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  // fileFilter: fileFilter
});

const getType = async (req, res, next) => {
  try {
    return res.send({
      message: "success"
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error: true,
    });
  }
};

const addmaintenance = async (req, res, next) => {
  try {
    const connection = await mysql.createConnection(database)
    let create_by = req.body.user_id
    let img_path = req.file.filename
    let status = 'W'
    let detail = req.body.detail
    let type_manage = req.body.typeManage
    let sql = `insert into maintenance_noti (create_by, img_path, status, detail, typeManage) values('${create_by}', '${img_path}', '${status}', '${detail}', '${type_manage}')`
    await connection.query(sql)
    await connection.end()
    return res.send({
      message: "success",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error: true,
    });
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const connection = await mysql.createConnection(database);
    let accept_data = req.body;
    let status = accept_data.status;
    let sql;
    let date_now = new Date();
    date_now.setHours(date_now.getHours() + 7);
    if (status.toLowerCase() == "w") {
      accept_data.status = "C";
      sql = queryize
        .update()
        .table("maintenance_noti")
        .set({
          status: accept_data.status,
          accept_by: accept_data.admin_id,
          accept_at: date_now,
          updated_at: date_now,
        })
        .where({ maintenance_id: accept_data.maintenance_id })
        .compile();
    } else if (status.toLowerCase() == "c") {
      accept_data.status = "S";
      sql = queryize
        .update()
        .table("maintenance_noti")
        .set({
          status: accept_data.status,
          updated_at: date_now,
        })
        .where({ maintenance_id: accept_data.maintenance_id })
        .compile();
    } else {
      await connection.end();
      res.send({
        message: "status invalid",
      });
      return 0;
    }

    await connection.query(sql.query, sql.data);
    await connection.end();
    if (accept_data.status == "C") {
      return res.send({
        message: "accept work success",
      });
    } else {
      return res.send({
        message: "work successed",
      });
    }
  } catch (error) {
    console.log("error", error.message);
    res.send({
      result: "fail",
      message: error.message,
    });
  }
};

router.get("/", getType);
router.post('/add', upload.single('img_path'), addmaintenance)
router.post("/api/updateStatus", updateStatus);
module.exports = router;
