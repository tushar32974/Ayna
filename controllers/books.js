import Book from "../models/Book.js";
import Author from "../models/Author.js";

/* CREATE */
export const createBook = async (req, res) => {
  try {
    const { id, authorId, title } = req.body;

    const author = await Author.findOne({ id: authorId });

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newBook = new Book({
      id,
      authorId,
      author: author.name,
      title,
      likes: {}
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};




// Controller function to get paginated books with sorting options
export const getPaginatedBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "likes",
      sortOrder = "desc",
    } = req.query;

    // Validate sortOrder parameter
    const validSortOrders = ["asc", "desc"];
    if (!validSortOrders.includes(sortOrder)) {
      return res.status(400).json({ message: "Invalid sortOrder parameter" });
    }

    // Construct the sort object based on the sortBy and sortOrder parameters
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    // Find and paginate the books
    const books = await Book.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to get a book by ID
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID
    const book = await Book.findById(id);

    // Check if the book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



/* UPDATE */
export const likeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const {authorId} = req.body;
    const book = await Book.findOne({id:id});
    const isLiked = book.likes.get(authorId);

    if (isLiked) {
      return res
        .status(400)
        .json({ message: "Book already liked by the author" });
    } else {
      book.likes.set(authorId, true);
    }

    const updatedBook = await Book.findOneAndUpdate(
      { id: id },
      { likes: book.likes },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const unlikeBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId } = req.body;

    const book = await Book.findOne({ id: id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const isLiked = book.likes.get(authorId);

    if (!isLiked) {
      return res.status(400).json({ message: "Book not liked by the user" });
    } else {
      book.likes.delete(authorId);
    }

    const updatedBook = await Book.findOneAndUpdate(
      { id: id },
      { likes: book.likes },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};



// Controller function to update a book by ID
export const updateBook = async (req, res) => {
  try {
    const { id,authorId } = req.params;
    const updates = req.body;

    // Find the book by ID and update it
    const updatedBook = await Book.findOneAndUpdate({id:id}, updates, {
      new: true,
    });

    // Check if the book exists
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to delete a book by ID
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the book by ID and remove it
    const deletedBook = await Book.findOneAndRemove({ id: id });

    // Check if the book exists
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
