import { useState } from "react";
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
// Local image path
import backgroundImage from "./assets/background.jpeg";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          transition: "all 0.5s ease-in-out",
        }}
      >
        {/* Overlay for better text visibility */}
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            darkMode ? "bg-black/60" : "bg-white/50"
          }`}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        <div className="max-w-5xl mx-auto p-6 flex flex-col items-center">
          {/* Header */}
          <div className="w-full flex justify-between items-center mb-8">
            <h1
              className={`text-4xl font-extrabold text-center z-10 relative ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Book Library
            </h1>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition z-10 relative"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {/* Cards */}
          <div className="relative z-10 w-full flex flex-col items-center gap-6">
            <AddBook darkMode={darkMode} glass />
            <BookList darkMode={darkMode} glass />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
