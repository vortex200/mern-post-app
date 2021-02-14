const DatauriParser = require("datauri/parser");
const path = require("path");

const parser = new DatauriParser();

const formatFile = (file) => {
  const image = parser.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );
  return image;
};

module.exports = { formatFile };
