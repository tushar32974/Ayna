import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      min: 4,
      max: 50,
    },
    authorId: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 150,
      required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
    }
  },
  { timestamps: true }
);

const Book=mongoose.model("Book",bookSchema);

export default Book;