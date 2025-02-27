import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks, addBook } from "../store/bookSlice";
import AddBookForm from "./AddBookForm";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchBooks({ title: searchTerm, sort: "ASC", page: 1, limit: 10 }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search books by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setShowAddForm(!showAddForm)}>Add Book</button>
      </div>

      {showAddForm && <AddBookForm onClose={() => setShowAddForm(false)} />}
    </div>
  );
};

export default BookSearch;
