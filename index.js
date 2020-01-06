const express = require("express");
const app = express();
const mailjet = require("node-mailjet").connect(
  "a593ea3817a30a161471fcd65f2a2d10",
  "1406707711c5929cfe161fe5ee5d6903"
);
const port = 5000;

// Body parser
app.use(express.urlencoded({ extended: false }));

// Listen on port 5000
app.listen(port, () => {
  console.log("Server is booming on port 5000");
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/api/send", async (req, res) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "ifallinmeat@gmail.com",
          Name: "Default"
        },
        To: [
          {
            Email: req.body.email,
            Name: req.body.name
          }
        ],
        Subject: `Your pucharse of product ${req.body.product_name} was correctly`,
        TextPart: `Dear ${req.body.name} your pucharse was correctly bought`,
        HTMLPart: "<p>Thanks.</p>"
      }
    ]
  });

  let response = await request;
  res.send({
    status: response.Messages[0].Status ? "success" : "error"
  });
});


module.exports = app;