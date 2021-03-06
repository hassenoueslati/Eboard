const mongoose = require("mongoose");

var themeSchema = new mongoose.Schema({
  idClass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
  titre: {
    type: String,
  },
  description: {
    type: String,
  },
  dateCreation: {
    type: Date,
    min: "1987-09-28",
  },
});

module.exports = mongoose.model("Theme", themeSchema);
