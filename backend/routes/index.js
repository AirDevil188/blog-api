const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

router.get("/", indexController.blog_index_controller);

module.exports = router;
