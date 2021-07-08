const router = require("express").Router();
const express = require("express");
const app = express();
const ejs = require("ejs");

router.get("/", function (req, res) {
  res.render("home");
});

module.exports = router;
