var createError = require("http-errors");
var express = require("express");
var path = require("path");

const cors = require("cors");

var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();


// ===============================
// View engine
// ===============================

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);


// ===============================
// Middleware
// ===============================

app.use(logger("dev"));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cookieParser());


// ===============================
// Public folder
// ===============================

app.use(
  express.static(
    path.join(__dirname, "public")
  )
);


// ===============================
// Uploads folder
// ===============================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ===============================
// Routes
// ===============================

app.use("/", indexRouter);

app.use("/users", usersRouter);


// ===============================
// 404
// ===============================

app.use(function (req, res, next) {

  next(createError(404));

});


// ===============================
// Error handler
// ===============================

app.use(function (err, req, res, next) {

  res.locals.message = err.message;

  res.locals.error =
    req.app.get("env") === "development"
      ? err
      : {};

  res.status(err.status || 500);

  res.render("error");

});


module.exports = app;