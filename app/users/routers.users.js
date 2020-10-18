const express = require("express");
const userRouterAuth = express.Router();
const controllers = require("./controllers.users");

userRouterAuth.post("/auth/register", controllers.validRegisterUser, controllers.registerUser);

userRouterAuth.post("/auth/login", controllers.validLoginUser, controllers.loginUser);

userRouterAuth.post("/auth/logout", controllers.authorization, controllers.logoutUser);

userRouterAuth.get("/users/current", controllers.authorization, controllers.getCurrentUser);

userRouterAuth.patch("/users", controllers.authorization, controllers.patchSubscriptionUser);

userRouterAuth.put("/addMusic/:idMusic", controllers.authorization, controllers.addMusicToUser);

userRouterAuth.get("/joinMusic", controllers.authorization, controllers.joinMusic);

module.exports = userRouterAuth;
