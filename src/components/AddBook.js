import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

function AddBook({ darkMode, glass }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;
    await addDoc(collection(db, "books"), { title, author, image });
    setTitle("");
    setAuthor("");
    setImage("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 mb-6 w-full max-w-md rounded-2xl shadow-2xl transition-all duration-300 ${
        glass
          ? `bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 ${
              darkMode ? "text-white" : "text-gray-900"
            }`
          : darkMode
          ? "bg-gray-800 bg-opacity-80 text-white"
          : "bg-white bg-opacity-70 text-gray-900"
      }`}
    >
      <input
        className={`w-full p-2 mb-3 rounded-lg border focus:ring-2 focus:ring-blue-400 ${
          darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"
        }`}
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className={`w-full p-2 mb-3 rounded-lg border focus:ring-2 focus:ring-blue-400 ${
          darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"
        }`}
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        className={`w-full p-2 mb-3 rounded-lg border focus:ring-2 focus:ring-blue-400 ${
          darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-900 placeholder-gray-500"
        }`}
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition w-full">
        Add Book
      </button>
    </motion.form>
  );
}

export default AddBook;
