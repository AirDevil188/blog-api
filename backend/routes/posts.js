const express = require("express");
const postController = require("../controllers/postController");

// router.get("/", indexController.blog_index_controller);

const router = express.Router();
router.get("/", postController.posts_get_controller);

router.post("/", postController.post_create_controller);

router.put("/:id", postController.post_update_controller);

router.delete("/:id", postController.post_delete_controller);

/* GET users listing. */
// router.get("/", postController.posts_get_controller);

module.exports = router;
