const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const ContactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  filmUsers: [{ type: ObjectId, ref: "Film" }],
});

module.exports = model("Contacts", ContactsSchema);
