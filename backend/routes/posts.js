const express = require("express");
const postController = require("../controllers/postController");
const passport = require("passport");

// router.get("/", indexController.blog_index_controller);

const router = express.Router();
router.get("/", postController.posts_get_controller);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.send(req.jwt);
  }
);

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

/* GET users listing. */

module.exports = router;
