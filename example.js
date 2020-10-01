const express = require("express");
const Joi = require("joi");

const app = express();
const PORT = 3000;
require("dotenv").config();

// process.env.TTTTTTTT = 111111111111111; // работает
console.log(process.env);

app.use(express.json());

app.get("/hello", (req, res, next) => {
  console.log("req.body: ", req.body);
  res.send("Hello Kitty!");
});

app.get(
  "/weather",
  (req, res, next) => {
    const weatherRul = Joi.object({
      lat: Joi.string().required(),
      lon: Joi.string().required(),
    });
    //console.log("weatherRul: ", weatherRul);
    console.log("req.query: ", req.query);
    console.log("req.body: ", req.body);
    //
    let valid = weatherRul.validate(req.query);
    //console.log("d: ", valid);

    if (valid.error) {
      return res.status(400).send(valid.error);
    }

    next();
  },
  (req, res, next) => {
    console.log("req.query: ", req.query);

    res.json({ weather: "test+" });
    // res.send({ weather: "test+" });
  },
);

app.listen(PORT, () => console.log("Started Port ", PORT));
