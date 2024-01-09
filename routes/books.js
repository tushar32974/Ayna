import express from "express";
import {
  likeBook,
  getBookById,
  getPaginatedBooks,
  updateBook,
  deleteBook,
  createBook,
  unlikeBook
} from "../controllers/books.js";
import { verifyToken, verifyUserOwnership } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken,createBook);


/* READ */
router.get("/:id", verifyToken, getBookById);
router.get("/", verifyToken, getPaginatedBooks);


/* UPDATE */
router.put("/:id/like", verifyToken, likeBook);
router.put("/:id/unlike", verifyToken, unlikeBook);

/* PUT route to update a Book by ID*/
router.put("/:id/:authorId", verifyToken, verifyUserOwnership, updateBook);

/* DELETE route to delete a Book by ID*/
router.delete("/:id/:authorId", verifyToken, verifyUserOwnership, deleteBook);

export default router;
