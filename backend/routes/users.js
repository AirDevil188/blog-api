const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.get("/users", userController.list_users_controller);

router.post("/sign-up", userController.create_user_controller);

router.post("/log-in", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }

    req.login(user, { session: false });
    jwtCreateToken(req, res);
  })(req, res, next);
});

router.put(
  "users/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.send(req.jwt);
  }
);

router.delete(
  "users/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.send(req.jwt);
  }
);

module.exports = router;
