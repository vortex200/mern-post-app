const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { cloudinaryConfig } = require("./lib/cloudinary");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use("/public/uploads", express.static("public/uploads"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("*", cloudinaryConfig);

app.use("/api/user", require("./routes/userRouter.js"));
app.use("/api/posts", require("./routes/postRouter.js"));

if (process.env.NODE_ENV === "production") {
  console.log("Started in production");
  app.use(express.static(path.resolve(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));

module.exports = app;
