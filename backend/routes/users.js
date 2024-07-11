const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.get("/users", userController.list_users_controller_get);

router.post("/sign-up", userController.user_create_controller_post);

router.post("/log-in", userController.user_log_in_controller_post);

router.delete(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.jwt);
    return res.send(req.jwt);
  },
  userController.user_delete_controller
);

module.exports = router;
