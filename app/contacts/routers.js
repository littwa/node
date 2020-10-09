const express = require("express");

const userRouter = express.Router();
const controllers = require("./controllers.js");

userRouter.get("/contacts", controllers.getContacts);

userRouter.post("/contacts", controllers.postContact); // controllers.valid,

userRouter.get("/contacts/:contactId", controllers.validId, controllers.getContactId);

userRouter.delete("/contacts/:contactId", controllers.validId, controllers.deleteContact);

userRouter.patch("/contacts/:contactId", controllers.validId, controllers.updaterContact);

userRouter.patch("/contacts/add/films/:contactId", controllers.validId, controllers.validFilms, controllers.addFilms);

userRouter.patch("/contacts/del/films/:contactId", controllers.validId, controllers.validFilmsDel, controllers.deleteFilms);

module.exports = userRouter;
