require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Connected to MongoDB 🔥`));

app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
