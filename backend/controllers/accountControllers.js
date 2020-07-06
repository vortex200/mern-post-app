const Account = require("../models/account.model");

module.exports = {
  getAll: function (req, res) {
    Account.find({}, (err, result) => {
      if (err) {
        res.status(500).json({ error: "not found" });
      } else {
        res.status(200).json({ result });
      }
    });
  },

  getById: function (req, res) {
    const _id = req.params.id;
    Account.findOne({ _id }, (err, result) => {
      if (err) {
        res.status(500).json({ error: "not found" });
      } else {
        res.status(200).json({ result });
      }
    });
  },

  create: function (req, res) {
    if (!req.user && !req.user.role === "Admin") {
      return res.status(400).json({ error: "no access" });
    }

    if (
      req.body.title &&
      req.body.description &&
      req.body.category &&
      req.body.price &&
      req.file
    ) {
      const title = req.body.title;
      const description = req.body.description;
      const category = req.body.category;
      const price = Number(req.body.price);
      const image = req.file.path;

      const newAccount = new Account({
        title,
        description,
        category,
        price,
        image,
      });
      newAccount
        .save()
        .then(() => {
          return res.status(200).json({ status: "success" });
        })
        .catch((err) => {
          return res.status(500).json({ error: "error saving model: " + err });
        });
    } else {
      return res.status(500).json({ error: "bad request" });
    }
  },

  createById: function (req, res) {
    const _id = req.params.id;
    Account.findOne({ _id }, (err, doc) => {
      console.log(doc);
      if (req.body.title) doc.title = req.body.title;
      if (req.body.description) doc.description = req.body.description;
      if (req.body.category) doc.category = req.body.category;
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
  },

  deleteById: function (req, res) {
    const _id = req.params.id;
    Account.findOneAndDelete({ _id }, (err, doc) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        console.log("Deleted item: " + doc);
        res.status(200).json({ status: "success" });
      }
    });
  },
};
