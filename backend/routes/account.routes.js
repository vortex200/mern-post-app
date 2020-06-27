const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const Account = require("../models/account.model");

router.get("/", (req, res) => {
  Account.find({}, (err, result) => {
    if (err) {
      res.status(500).json({ error: "not found" });
    } else {
      res.status(200).json({ result });
    }
  });
});

router.get("/:id", (req, res) => {
  const _id = req.params.id;
  Account.findOne({ _id }, (err, result) => {
    if (err) {
      res.status(500).json({ error: "not found" });
    } else {
      res.status(200).json({ result });
    }
  });
});

router.post("/", upload.single("image"), (req, res) => {
  if (req.body.value && req.body.description && req.body.price) {
    const value = req.body.value;
    const description = req.body.description;
    const price = Number(req.body.price);
    const image = req.file.path;

    const newAccount = new Account({ value, description, price, image });
    newAccount
      .save()
      .then(() => {
        res.status(200).json({ status: "success" });
      })
      .catch((err) => {
        res.status(500).json({ error: "error saving model: " + err });
      });
  } else {
    res.status(500).json({ error: "bad request" });
  }
});

router.post("/:id", upload.single("image"), (req, res) => {
  const _id = req.params.id;
  Account.findOne({ _id }, (err, doc) => {
    console.log(doc);
    if (req.body.value) doc.value = req.body.value;
    if (req.body.description) doc.description = req.body.description;
    if (req.body.price) doc.price = req.body.price;
    if (req.file) doc.image = req.file.path;

    doc
      .save()
      .then(() => {
        res.status(200).json({ status: "success" });
      })
      .catch((err) => {
        res.status(500).json({ error: "error saving model: " + err });
      });
  });
});

router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  Account.findOneAndDelete({ _id }, (err, doc) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      console.log("Deleted item: " + doc);
      res.status(200).json({ status: "success" });
    }
  });
});

module.exports = router;
