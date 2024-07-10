const express = require("express");
const postController = require("../controllers/postController");
const passport = require("passport");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();
router.get("/", postController.list_posts_controller_get);

router.post(
  "/posts/create",
  isAuth,
  postController.post_create_controller_post
);

router.put("/posts/:id", isAuth, postController.post_update_controller_put);

router.delete("/posts/:id", isAuth, postController.post_delete_controller);

module.exports = router;
