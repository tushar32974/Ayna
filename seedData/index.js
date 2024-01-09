import mongoose from "mongoose";

// Dummy data for Author
export const authorsData = [
  {
    id: '001',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone_no: '1234567890',
  },
  {
    id: '002',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password456',
    phone_no: '9876543210',
  },
  {
    id: '003',
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'password789',
    phone_no: '5555555555',
  },
  {
    id: '004',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'passwordabc',
    phone_no: '6666666666',
  },
  {
    id: '005',
    name: 'Eve Wilson',
    email: 'eve@example.com',
    password: 'passwordefg',
    phone_no: '7777777777',
  },
];

// Dummy data for Book
export const booksData = [
  {
    id: 'B001',
    authorId: '001',
    author: 'John Doe',
    title: 'The Art of Coding',
    likes: {},
  },
  {
    id: 'B002',
    authorId: '002',
    author: 'Jane Doe',
    title: 'Programming 101',
    likes: {},
  },
  {
    id: 'B003',
    authorId: '003',
    author: 'Alice Smith',
    title: 'Web Development Essentials',
    likes: {},
  },
  {
    id: 'B004',
    authorId: '004',
    author: 'Bob Johnson',
    title: 'Python Mastery',
    likes: {},
  },
  {
    id: 'B005',
    authorId: '005',
    author: 'Eve Wilson',
    title: 'Machine Learning Basics',
    likes: {},
  },
];

