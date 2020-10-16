const { Schema, model } = require("mongoose"); // , Types: { ObjectId }

const ContactsSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  films: [{ name: { type: String, require: true }, genre: { type: String, required: true } }],
  // avouriteFilms: [{ type: ObjectId, ref: 'Film' }]
});

module.exports = model("Contacts", ContactsSchema);
