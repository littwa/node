const modelUsers = require("./model.users");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  Types: { ObjectId },
} = require("mongoose");

const modelMusic = require("../music/model.music");

class Controllers {
  registerUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const isExisted = await modelUsers.findOne({ email });
      if (isExisted) {
        return res.status(409).send("Email in use");
      }
      const hashPass = await bcrypt.hash(password, 5);
      const user = await modelUsers.create({ ...req.body, password: hashPass });
      return res.status(201).send({ user: { email: user.email, subscription: user.subscription } });
    } catch (err) {
      next(err.message);
    }
  };

  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const isExisted = await modelUsers.findOne({ email });
      const isValidPass = isExisted && (await bcrypt.compare(password, isExisted.password));

      if (!isExisted || !isValidPass) {
        return res.status(401).send("Email or password is wrong");
      }

      const token = await jwt.sign({ id: isExisted.id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
      });

      const updatedUser = await modelUsers.findByIdAndUpdate(
        isExisted.id,
        {
          token,
        },
        { new: true, useFindAndModify: false },
      );

      return res.status(200).send({
        token: updatedUser.token,
        user: {
          email: updatedUser.email,
          subscription: updatedUser.subscription,
        },
      });
    } catch (err) {
      next(err.message);
    }
  };

  authorization = async (req, res, next) => {
    try {
      const authoriz = req.get("Authorization") || "";
      const token = authoriz.slice(7);

      let userId;
      try {
        userId = await jwt.verify(token, process.env.TOKEN_SECRET).id;
      } catch (err) {
        err.message = "Not authorized";
      }

      const user = await modelUsers.findById(userId);

      if (!user || user.token !== token) {
        return res.status(401).send({
          message: "Not authorized",
        });
      }

      req.user = user;
      req.token = token;

      next();
    } catch (err) {
      next(err.message);
    }
  };

  logoutUser = async (req, res, next) => {
    try {
      const userWithoutToken = await modelUsers.findByIdAndUpdate(
        req.user._id,
        {
          token: "",
        },
        { new: true, useFindAndModify: false },
      );
      if (!userWithoutToken) {
        return res.status(401).send({
          message: "Not authorized",
        });
      }
      return res.status(204).send();
    } catch (err) {
      next(err.message);
    }
  };

  getCurrentUser = async (req, res, next) => {
    try {
      const currentUser = await modelUsers.findById(req.user._id);
      if (!currentUser) {
        return res.status(401).send({
          message: "Not authorized",
        });
      }
      return res
        .status(200)
        .send({ email: currentUser.email, subscription: currentUser.subscription });
    } catch (err) {
      next(err.message);
    }
  };

  patchSubscriptionUser = async (req, res, next) => {
    try {
      const updateUserSubscription = await modelUsers.findByIdAndUpdate(
        req.user._id,
        {
          subscription: req.body.subscription,
        },
        { new: true, useFindAndModify: false },
      );
      return res.status(202).send({
        email: updateUserSubscription.email,
        subscription: updateUserSubscription.subscription,
      });
    } catch (err) {
      next(err.message);
    }
  };

  addMusicToUser = async (req, res, next) => {
    try {
      const { idMusic } = req.params;
      // console.log();
      const music = await modelMusic.findById(idMusic);
      if (!music) {
        return res.status(404).send({ message: "Film not found" });
      }
      const updateUserMusicList = await modelUsers.findByIdAndUpdate(
        req.user.id,
        {
          $push: { music: idMusic },
        },
        { new: true },
      );

      res.status(200).send(updateUserMusicList);
    } catch (err) {
      next(err);
    }
  };

  joinMusic = async (req, res, next) => {
    try {
      const idUser = req.user.id;
      console.log(1, idUser);

      const joinedFilms = await modelUsers.aggregate([
        // { $match: { _id: ObjectId(idUser) } }, ???
        {
          $lookup: {
            from: "musics", // название колекции (не модели!)
            localField: "music", // поле в пользователе, которое содержит масив id
            foreignField: "_id", // поле в колекции , которое должно отвечать id фильмов в коллекции пользователей
            as: "musicList", // как поле с документами фильмов будет называтся
          },
        },
        {
          $unset: ["music"], // исключить из результата поле "music"
        },
      ]);
      return res.send(joinedFilms);
    } catch (err) {
      next(err);
    }
  };

  validRegisterUser = (req, res, next) => {
    const validSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      subscription: Joi.string(),
    });
    const { error } = validSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
    next();
  };

  validLoginUser = (req, res, next) => {
    const validSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = validSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
    next();
  };
}

module.exports = new Controllers();
