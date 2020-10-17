const mongoose = require("mongoose");

const MusicModel = new mongoose.Schema({
  artist: { type: String, reqired: true },
  style: { type: String, reqired: true },
  album: [String],
});

module.exports = mongoose.model("Music", MusicModel);
