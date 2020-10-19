const express = require("express");
const userRouterAuth = express.Router();
const controllers = require("./controllers.users");

// const path = require("path");
// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: "public",
//   filename: function (req, file, cb) {
//     console.log("file", file);
//     const ext = path.parse(file.originalname).ext;
//     cb(null, Date.now() + ext);
//   },
// });

// const upload = multer({ storage });

userRouterAuth.post(
  "/auth/register",

  controllers.multerMiddlware().single("avatar"),
  controllers.validRegisterUser,
  controllers.imageMini,
  controllers.registerUser,
);

userRouterAuth.post("/auth/login", controllers.validLoginUser, controllers.loginUser);

userRouterAuth.post("/auth/logout", controllers.authorization, controllers.logoutUser);

userRouterAuth.get("/users/current", controllers.authorization, controllers.getCurrentUser);

module.exports = userRouterAuth;
