import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function BookList({ darkMode, glass }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "books"), (snapshot) => {
      setBooks(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id) => await deleteDoc(doc(db, "books", id));

  const handleUpdate = async (id, title, author, image) => {
    const newTitle = prompt("New Title:", title);
    const newAuthor = prompt("New Author:", author);
    const newImage = prompt("New Image URL:", image || "");
    if (newTitle && newAuthor) {
      await updateDoc(doc(db, "books", id), { title: newTitle, author: newAuthor, image: newImage });
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(books);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setBooks(items);
  };

  const colors = [
    "from-pink-200 to-pink-400",
    "from-green-200 to-green-400",
    "from-blue-200 to-blue-400",
    "from-yellow-200 to-yellow-400",
    "from-purple-200 to-purple-400",
    "from-red-200 to-red-400",
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="books">
        {(provided) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <AnimatePresence>
              {books.map((book, index) => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                return (
                  <Draggable key={book.id} draggableId={book.id} index={index}>
                    {(provided) => (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.5)" }}
                        whileDrag={{ scale: 1.1, rotate: 2 }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-5 w-72 rounded-2xl transition-all duration-300 ${
                          glass
                            ? `bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 ${
                                darkMode ? "text-white" : "text-gray-900"
                              } shadow-2xl`
                            : darkMode
                            ? "bg-gray-800 bg-opacity-80 text-white shadow-2xl"
                            : `bg-white bg-opacity-70 text-gray-900 bg-gradient-to-br ${randomColor} shadow-2xl`
                        }`}
                      >
                        {/* Book Image */}
                        {book.image && (
                          <img
                            src={book.image}
                            alt={book.title}
                            className="w-full h-40 object-cover rounded-xl mb-3 shadow-md"
                          />
                        )}

                        {/* Title & Author */}
                        <h2 className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {book.title}
                        </h2>
                        <p className={`mb-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          by {book.author}
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-end gap-2">
                          <button
                            className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition"
                            onClick={() => handleUpdate(book.id, book.title, book.author, book.image)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
                            onClick={() => handleDelete(book.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                );
              })}
            </AnimatePresence>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default BookList;
