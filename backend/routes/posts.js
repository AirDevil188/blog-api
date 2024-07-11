const express = require("express");
const postController = require("../controllers/postController");
const passport = require("passport");

const router = express.Router();
router.get("/", postController.list_posts_controller_get);

router.post(
  "/posts/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.send(req.jwt);
  },
  postController.post_create_controller_post
);

router.put(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.send(req.jwt);
  },
  postController.post_update_controller_put
);

router.delete(
  "/posts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.send(req.jwt);
  },
  postController.post_delete_controller
);

module.exports = router;
