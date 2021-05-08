const io = require("socket.io")(8080, {
  cors: {
    origin: "http://localhost:3000/haiya",
    methods: ["GET", "POST"],
  },
});

const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

io.on("connection", (socket) => {
  console.log("Connected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/send_mail", cors(), async (req, res) => {
  let { text } = req.body;
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9eb047b0e71361",
      pass: "42426cd0b6400c",
    },
  });

  await transport.sendMail({
    from: process.env.MAIL_FROM,
    to: "test@test.com",
    subject: "test email",
    html: `<div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px
    ">
    <h2>Just saying, Haiya!>
    <p>${text}</p>

    <p>All the best, Haiya!</p>
    `,
  });
});

app.listen(
  (process.env.PORT || 4000,
  () => {
    console.log("Listening on 4000");
  })
);
