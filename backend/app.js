const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use("/public/uploads", express.static("public/uploads"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", require("./routes/routes.js"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

module.exports = app;
