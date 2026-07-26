const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    likes: {
      type: Number,
      default: 0,
    },

    comments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);