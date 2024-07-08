const express = require("express");
const router = express.Router();
const passport = require("passport");

const indexController = require("../controllers/indexController");
const userController = require("../controllers/userController");
const { jwtCreateToken } = require("../config/jwtCreateToken");

router.get("/", indexController.blog_index_controller);

router.post("/sign-up", userController.create_user_controller);

router.post(
  "/log-in",
  passport.authenticate("local", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    jwtCreateToken(req, res);

    return res.send(res.json);
  }
);

module.exports = router;
