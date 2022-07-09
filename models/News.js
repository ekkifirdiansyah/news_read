const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please input Bank Name!"],
  },
  subTitle: {
    type: String,
    required: [true, "Please input Account Number!"],
  },
  description: {
    type: String,
    required: [true, "Please input Account Holder!"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  date: {
    type: date,
    required: true,
  },
});

module.exports = mongoose.model("News", newsSchema);
