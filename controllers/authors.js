import Author from "../models/Author.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";

/* READ */
export const getAuthorWithBooks = async (req, res) => {
  try {
    const { id } = req.params;

    const authorWithBooks = await Author.aggregate([
      {
        $match: { id: id },
      },
      {
        $lookup: {
          from: "books",
          let: { authorId: "$id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$authorId", "$$authorId"] },
              },
            },
          ],
          as: "books",
        },
      },
      {
        $project: {
          id: 1,
          name: 1,
          email: 1,
          password: 1,
          phone_no: 1,
          books: { $ifNull: ["$books", []] },
        },
      },
    ]);

    if (authorWithBooks.length === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(authorWithBooks[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getAuthorsWithBookCount = async (req, res) => {
  try {
    const authorsWithBooksCount = await Author.aggregate([
      {
        $lookup: {
          from: "books",
          let: { authorId: "$id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$authorId", { $toString: "$authorId" }] },
              },
            },
          ],
          as: "books",
        },
      },
      {
        $project: {
          id: 1,
          name: 1,
          email: 1,
          password: 1,
          phone_no: 1,
          // Add other author fields as needed
          bookCount: { $size: "$books" },
        },
      },
    ]);

    console.log(authorsWithBooksCount); // Log the result for debugging

    res.status(200).json(authorsWithBooksCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Controller function to update author details
export const updateAuthorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find the author by ID
    const author = await Author.findOne({id:id});

    // Check if the author exists
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Update author details
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        author[key] = updates[key];
      }
    }

    // Save the updated author
    await author.save();

    // Return the updated user
    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to delete an author
export const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the author by ID
    const author = await Author.findOne({ id: id });

    // Check if the author exists
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    // Remove the Author
    await author.remove();

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
