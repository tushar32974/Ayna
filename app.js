import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth.js";
import authorRoutes from "./routes/authors.js";
import bookRoutes from "./routes/books.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { booksData,authorsData } from "./seedData/index.js";
import Author from "./models/Author.js";
import Book from "./models/Book.js";

/* CONFIGURATIONS */

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());




/*Register the Author*/
app.post("/auth/register", register);



/* ROUTES */
app.use("/auth", authRoutes);
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);





/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    
    await Book.deleteMany();
    await Author.deleteMany();
    await Book.insertMany(booksData);
    await Author.insertMany(authorsData);

    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  
  })
  .catch((error) => console.log(`${error} did not connect`));

