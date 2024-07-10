const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");
const { isAuth } = require("../middleware/isAuth");

router.get("/users", userController.list_users_controller_get);

router.post("/sign-up", userController.user_create_controller_post);

router.post("/log-in", userController.user_log_in_controller_post);

router.delete("/users/:id", isAuth, userController.user_delete_controller);

module.exports = router;
