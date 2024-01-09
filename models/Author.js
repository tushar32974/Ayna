import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      min: 4,
      max: 50,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    phone_no: {
      type: String,
      required: true,
      min: 10,
      max: 10,
    }
  },
  { timestamps: true }
);

const Author=mongoose.model("Author",AuthorSchema);
export default Author;