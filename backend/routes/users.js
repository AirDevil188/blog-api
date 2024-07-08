const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.get("/", userController.list_users_controller);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.send(req.jwt);
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.send(req.jwt);
  }
);

module.exports = router;
