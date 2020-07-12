const fs = require("fs");
const path = require("path");
const Post = require("../../models/post.model");

const getAll = function (req, res) {
  Post.find({}, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({ result });
    }
  });
};

const getById = function (req, res) {
  const _id = req.params.id;
  Post.findOne({ _id }, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({ result });
    }
  });
};

const create = function (req, res) {
  if (
    req.body.title &&
    req.body.description &&
    req.body.category &&
    req.body.price &&
    req.file &&
    req.user
  ) {
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    const price = Number(req.body.price);
    const image = req.file.path;
    const createdBy = req.user._id;

    const newPost = new Post({
      title,
      description,
      category,
      price,
      image,
      createdBy,
    });

    newPost
      .save()
      .then(() => {
        return res.status(200).json({ status: "success" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "error saving model: " + err });
      });
  } else {
    return res.status(500).json({ error: "bad request" });
  }
};

const updateById = function (req, res) {
  const _id = req.params.id;
  const userId = req.user._id;
  Post.findOne({ _id }, (err, doc) => {
    if (err) {
      res.status(500).json({ err });
    }
    // If post is not created by user
    if (userId.toString() !== doc.createdBy) {
      res.status(501).json({ err: "no access" });
    } else {
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
          res.status(500).json({ err });
        });
    }
  });
};

const deleteById = function (req, res) {
  const _id = req.params.id;
  Post.findById(_id, (err, doc) => {
    if (err) {
      return res.status(500).json({ err });
    } else {
      if (req.user._id.toString() === doc.createdBy) {
        doc.delete((err, doc) => {
          if (err) return res.status(500).json({ err });
          try {
            fs.unlinkSync(path.join(__dirname, "..", "..", doc.image));
          } catch (error) {
            console.log(error);
          }
          return res.status(200).json({ status: "success" });
        });
      } else {
        return res.status(400).json({ error: "no access" });
      }
    }
  });
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
