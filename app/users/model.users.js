const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const UserSchema = new Schema({
  email: String,
  password: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: String,
  music: [{ type: ObjectId, ref: "Music" }],
});

module.exports = model("User", UserSchema);
