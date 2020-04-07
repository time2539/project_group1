let express = require('express')
let router = express.Router()
let jwt = require('jsonwebtoken')

const middleware = (req, res, next) => {
  try {
    let token = req.headers.authorization
    var decoded = jwt.verify(token, 'secret');
    if(decoded.data === 'admin') {
      next()
    } else {
      return res.status(403).send({
        message: 'you not admin'
      })
    }
  } catch (e) {
    return res.status(403).send({
      message: 'no token'
    })
  }
}

module.exports = middleware