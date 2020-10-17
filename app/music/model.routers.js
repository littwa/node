const express = require("express");
const musicRouter = express.Router();
const { createMusic } = require("./model.controllers");

musicRouter.post("/add/music", createMusic);

module.exports = musicRouter;
