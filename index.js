const express = require("express");
const app = express();

const path = require("path");
const argv = require("yargs").argv;
const { listContacts, getContactById, removeContact, addContact } = require("./contacts.js");

const cors = require("cors");

const morgan = require("morgan");

const userRouter = require("./app/routers");

app.use(morgan("combined"));

app.use("/api", userRouter);

// console.log(userRouter);

// let fff = async (req, res, next) => res.send(JSON.parse(await listContacts()));
// let data = await listContacts();

// app.get("/api/contacts", async (req, res, next) => res.send(JSON.parse(await listContacts())));

// app.get("/api/contacts", (req, res, next) => {
//   (async function () {
//     let data = await listContacts();
//     res.send(JSON.parse(data));
//   })();

//   //-----------then-----------------------
//   // listContacts().then((r) => {
//   //   res.send(JSON.parse(r));
//   // });
// });

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
