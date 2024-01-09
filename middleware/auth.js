import jwt from "jsonwebtoken";
import Book from "../models/Book.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log(token);
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    //console.log(req);
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller function to verify author ownership
export const verifyUserOwnership = async (req, res, next) => {
  try {
    const { id, authorId } = req.params;

    // Find the Book by ID
    const book = await Book.findOne({ id: id });

    // Check if the Book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the Author making the request is the same Author who created the Book
    if (book.authorId.toString() !== authorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to perform this action" });
    }

    next(); // Move to the next middleware (updateBook or deleteBook)
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
