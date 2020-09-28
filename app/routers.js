const express = require("express");
const userRouter = express.Router();
const { listContacts, getContactById, removeContact, addContact } = require("../contacts.js");

//app.get("/api/contacts", async (req, res, next) => res.send(JSON.parse(await listContacts())));

userRouter.get("/contacts", async (req, res, next) => res.send(JSON.parse(await listContacts())));

userRouter.get("/contacts/:contactId", async (req, res, next) => {
  // console.log(Number(req.params.contactId));
  // console.log(req.params);
  // res.send("121");
  let result = await getContactById(Number(req.params.contactId));
  res.send(result ? result : (res.status(404), '{"message": "Not found"}'));
});

module.exports = userRouter;
