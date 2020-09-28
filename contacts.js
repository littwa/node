const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  let data = await fsPromises.readFile(contactsPath, "utf-8");
  console.table(JSON.parse(data));
  // console.log(data);

  return data;
}

async function getContactById(contactId) {
  const data = await fsPromises.readFile(contactsPath, "utf-8");
  let contactsObj = JSON.parse(data);
  let findEl = contactsObj.find((el) => el.id === contactId);
  console.log(findEl);
  return findEl;
}

async function removeContact(contactId) {
  let data = await fsPromises.readFile(contactsPath, "utf-8");

  let contactsObj = JSON.parse(data);
  let withoutContactId = contactsObj.filter((el) => el.id !== contactId);

  contactsObj.length === withoutContactId.length && console.log("NO contactId-" + contactId);
  let newContactsJSON = JSON.stringify(withoutContactId);

  await fsPromises.writeFile(contactsPath, newContactsJSON);
  console.log("Contacts with id: " + contactId + " has been successfully removed!");
}

async function addContact(name, email, phone) {
  let data = await fsPromises.readFile(contactsPath, "utf-8");
  let contactsObj = JSON.parse(data);
  let newId = contactsObj.reduce((acc, el) => (el.id > acc ? el.id : acc), 0) + 1;
  contactsObj.push({ id: newId, name, email, phone });

  let newContactsJSON = JSON.stringify(contactsObj);

  await fsPromises.writeFile(contactsPath, newContactsJSON);

  console.log("Contact with id: " + newId + " has been successfully added!");
  console.table(contactsObj);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
