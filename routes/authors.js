import express from "express";
import {
  getAuthorWithBooks,
  getAuthorsWithBookCount,
  updateAuthorDetails,
  deleteAuthor,
} from "../controllers/authors.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAuthorsWithBookCount);
router.get("/:id", verifyToken, getAuthorWithBooks);

/* UPDATE */
router.put("/:id", verifyToken, updateAuthorDetails);

/* DELETE route to delete an Author*/
router.delete("/:id", verifyToken, deleteAuthor);

export default router;
