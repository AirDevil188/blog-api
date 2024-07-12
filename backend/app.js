const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/users");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST",
    optionsSuccessStatus: 204,
  })
);

const mongoDB = process.env.CONNECTION_STRING;

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind("database connection error"));

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/", postsRouter);
app.use("/", userRouter);

require("./config/passport");
// passportFile;

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
