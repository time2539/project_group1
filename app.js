var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var cors = require("cors");
var bodyParser = require("body-parser");
var middleware = require("./routes/middleware");
var mantenanceRouter = require("./routes/maintenance");
var dashboardRouter = require("./routes/dashboard");
var app = express();
app.use(express.static("public"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 100000000000000,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/maintenance", mantenanceRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter)
app.use("/api/dashboard", dashboardRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
