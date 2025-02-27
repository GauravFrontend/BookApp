import React, { useState } from "react";

const BookSearch = ({ onSearch, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = () => {
    console.log("🔍 handleSearch called with searchTerm:", searchTerm);

    if (!searchTerm.trim()) {
      console.warn("⚠️ Search prevented: Empty searchTerm.");
      setErrorMessage("Please enter a search term.");
      return;
    }

    setErrorMessage(""); // Clear error message
    console.log("✅ Calling onSearch with:", searchTerm.trim());
    onSearch(searchTerm.trim()); // Ensure no extra spaces are passed
  };

  const handleKeyPress = (e) => {
    console.log("⌨️ Key pressed:", e.key);
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form behavior
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books by title..."
          value={searchTerm}
          onChange={(e) => {
            console.log("✏️ Updating searchTerm:", e.target.value);
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyPress}
        />
        <button onClick={() => {
          console.log("🖱️ Search button clicked");
          handleSearch();
        }}>Search</button>
        <button onClick={() => {
          console.log("➕ Add Book button clicked");
          onAdd();
        }}>Add Book</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default BookSearch;
