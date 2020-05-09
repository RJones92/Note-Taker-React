//jshint esversion:6

const express = require("express");

const app = express();

app.get("/express_backend", function (req, res) {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
