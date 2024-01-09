import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Author from "../models/Author.js";

/* REGISTER Author */
export const register = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      password,
      phone_no
    } = req.body;
    console.log(req.body);

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAuthor = new Author({
      id,
      name,
      email,
      password: passwordHash,
      phone_no
    });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const author = await Author.findOne({ email: email });
    if (!author) return res.status(400).json({ msg: "Author does not exist. " });
    const isMatch = await bcrypt.compare(password, author.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials. " });

    const token = jwt.sign({ id: author._id }, process.env.JWT_SECRET);
    delete author.password;
    res.status(200).json({ token, user: author });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
