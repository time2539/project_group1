var express = require("express");
var router = express.Router();
const mysql = require("mysql2/promise");
const database = require("../config/database");
const queryize = require("queryize");
var multer  = require('multer')
var fs = require('fs')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
  // fileFilter: fileFilter
})

const addmaintenance = async (req, res, next) => {
  try {
    const connection = await mysql.createConnection(database)
    let create_by = req.body.user_id
    let img_path = req.file.filename
    let status = 'p'
    let detail = req.body.detail
    let sql = `insert into maintenance_noti (create_by, img_path, status, detail) values('${create_by}', '${img_path}', '${status}', '${detail}')`
    await connection.query(sql)
    await connection.end()
    return res.send({
      message: 'success'
    })
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      error: true,
    });
  }
}

const updateStatus = async (req, res, next) => {
  const connection = await mysql.createConnection(database)
  let sql = queryize.update()
  .table('maintenance_noti')
  .set({
    status: req.body.status,
    accept_at: Date.now(),
    create_by: req.body.user_id
  })
  .where({'maintenance_id' : req.body.maintenance_id})
  .compile();
  await connection.query(sql.query,sql.data);
  await connection.end();
  return res.send({
    message: 'success',
    result:{
      status: req.body.status,
      accept_at: Date.now(),
      create_by: req.body.user_id
    }
  });
};

router.post('/add', upload.single('img_path'), addmaintenance)
router.put("/updateStatus", updateStatus);
module.exports = router;
