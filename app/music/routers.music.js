const express = require("express");
const musicRouter = express.Router();
const { createMusic } = require("./controllers.music");

musicRouter.post("/contacts/add/music", createMusic);

module.exports = musicRouter;
