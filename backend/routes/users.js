const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.list_users_controller);

router.post("/", userController.create_user_controller);

router.put("/:id", userController.update_user_controller);

router.delete("/:id", userController.delete_user_controller);

module.exports = router;
