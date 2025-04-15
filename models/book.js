const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.objectId,
      ref: "Author",
      required: true
    },
    category: {
      type: mongoose.Schema.Types.objectId,
      ref: "BookCategory",
      required: true
    },
    imageUrl: {
      type: String
      /* it should be required update it after adding the cloudinary */
    },
    readers: [
      {
        type: mongoose.Schema.Types.objectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);
