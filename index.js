const express = require("express");
const app = express();
const accountSid = "AC4f321c495eaecb2c31bf1df060d6dced";
const authToken = "43f53676d0857ddf58bc686657567f97";
const client = require("twilio")(accountSid, authToken);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Nope brother here you can not find anything... HaHahaha");
});

app.post("/send", (req, res) => {
  console.log(req.query);
  let obj = req.query;
  client.messages
    .create({
      body: "Your OTP for Tomato Food Delivery is : " + obj.otp,
      messagingServiceSid: "MG286c281a3a449218eeaa1da5eca4cb11",
      to: "+" + obj.phone,
    })
    .then((message) => {
      console.log(message);
      if (message.errorMessage === null) {
        let obj = { success: true, message: message.errorMessage };
        res.send(obj);
      } else {
        let obj = { success: false, message: message.errorMessage };
        res.send(obj);
      }
    })
    .done();
});

app.listen(port, () => {
  console.log("Server is listening on: " + port);
});
