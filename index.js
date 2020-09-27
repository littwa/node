const path = require("path");
const argv = require("yargs").argv;
const { listContacts, getContactById, removeContact, addContact } = require("./contacts.js");

const express = require("express");
const morgan = require("morgan");
// console.log(morgan);

const app = express();

app.use(morgan("combined"));

app.get("/api/contacts", (req, res, next) => {
  (async function () {
    let data = await listContacts();
    res.send(JSON.parse(data));
  })();

  //-----------then-----------------------
  // listContacts().then((r) => {
  //   res.send(JSON.parse(r));
  // });
});
app.listen(3000, () => console.log("Started Port ", 3000));

//==================================================================
// console.log(1212);

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// invokeAction(argv);
