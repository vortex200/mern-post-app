const Post = require("../models/post.model");
const { uploadImage } = require("../utils/cloudinary");

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

const create = async function (req, res) {
  if (
    !req.body.title &&
    !req.body.description &&
    !req.body.category &&
    !req.body.price &&
    !req.file &&
    !req.user
  )
    return res.status(500).json({ error: "bad request" });

  try {
    const upload = await uploadImage(req.file);

    const { title, description, category } = req.body;
    const price = Number(req.body.price);
    const image = upload.secure_url;
    const createdBy = req.user._id;

    const newPost = new Post({
      title,
      description,
      category,
      price,
      image,
      createdBy,
    });

    await newPost.save();

    return res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(500).json({ err });
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

const deleteById = async function (req, res) {
  try {
    const _id = req.params.id;

    const doc = await Post.findById(_id);

    if (req.user._id.toString() === doc.createdBy) {
      await doc.delete();
      return res.status(200).json({ status: "success" });
    } else {
      return res.status(400).json({ error: "no access" });
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
