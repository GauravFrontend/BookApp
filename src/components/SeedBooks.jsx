import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../store/bookSlice";

const SeedBooks = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateBooks = async () => {
    setLoading(true);
    setMessage("Adding books...");

    const booksToAdd = Array.from({ length: 30 }, (_, index) => ({
      author: `Author ${index + 1}`,
      country: "USA",
      language: "English",
      link: `http://example.com/book${index + 1}`,
      pages: `${200 + index}`,
      title: `Test Book ${index + 1}`, // Unique title
      year: `${2000 + (index % 20)}`,
    }));

    for (const book of booksToAdd) {
      await dispatch(addBook(book));
    }

    setLoading(false);
    setMessage("✅ 30 books added for testing!");
  };

  return (
    <div className="seed-books-container">
      <button onClick={generateBooks} disabled={loading}>
        {loading ? "Adding..." : "Generate Test Data"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SeedBooks;
