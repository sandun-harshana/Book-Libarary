import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";

function AddBook({ darkMode, glass }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Title and Author are required!");
      return;
    }
    await addDoc(collection(db, "books"), { title, author, image });
    setTitle("");
    setAuthor("");
    setImage("");
    setError("");
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
      {/* Error Message */}
      {error && (
        <p className="text-red-500 font-semibold mb-3 text-sm">{error}</p>
      )}

      <input
        className={`w-full p-2 mb-3 rounded-lg border focus:ring-2 focus:ring-blue-400 transition-all ${
          darkMode
            ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
        }`}
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className={`w-full p-2 mb-3 rounded-lg border focus:ring-2 focus:ring-blue-400 transition-all ${
          darkMode
            ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
        }`}
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <input
        className={`w-full p-2 mb-3 rounded-lg border focus:ring-2 focus:ring-blue-400 transition-all ${
          darkMode
            ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
            : "bg-white text-gray-900 placeholder-gray-500 border-gray-300"
        }`}
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* Preview */}
      {image && (
        <motion.img
          src={image}
          alt="preview"
          className="w-full h-40 object-cover rounded-lg mb-3 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition w-full font-semibold shadow-md"
      >
        Add Book
      </motion.button>
    </motion.form>
  );
}

export default AddBook;
