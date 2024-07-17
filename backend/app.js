const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const jwtDecode = require("jwt-decode").jwtDecode;

dotenv.config();

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/users");

const User = require("./models/user");
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
require("./config/passport");
// passportFile;

// middleware to check if the jwt token is expired
app.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  const token = String(req.headers.authorization.split("Bearer "));
  const decoded = jwtDecode(token);
  const currentDateTime = new Date(Date.now()).toLocaleTimeString();
  const tokenExpiresIn = new Date(decoded.exp * 1000).toLocaleTimeString();

  // if the token expired return
  if (currentDateTime > tokenExpiresIn) {
    return next();
  }

  // if the token is valid find the user and assign req.user to user / and then send the information of the user to the frontend
  try {
    const user = await User.findById(decoded.user);
    req.user = user;
    return res.json({ user: user });
  } catch (err) {
    return next(err);
  }
});

app.use("/", indexRouter);
app.use("/", postsRouter);
app.use("/", userRouter);

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
