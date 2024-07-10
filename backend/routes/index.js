const express = require("express");
const router = express.Router();
const passport = require("passport");

const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const { jwtCreateToken } = require("../config/jwtCreateToken");

router.get("/", indexController.blog_index_controller);

module.exports = router;
