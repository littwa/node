const nodemailer = require("nodemailer");
// const path = require("path");

require("dotenv").config(); // { path: path.join(__dirname, ".env") }

const transporter = nodemailer.createTransport({
  // service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 587, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const mailOptions = {
  from: "litttwa@gmail.com", // sender address
  to: "littwa@ukr.net", // list of receivers
  subject: "Second email", // Subject line
  html: "<p>Your html here</p>", // plain text body
};
console.log(process.env.NODEMAILER_USER, process.env.NODEMAILER_PASS);
async function main() {
  try {
    // console.log(transporter);
    const result = await transporter.sendMail(mailOptions);
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
}

main();
