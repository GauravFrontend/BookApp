import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/bookSlice";
import BookSearch from "./BookSearch";
import BookTable from "./BookTable";
import AddBookForm from "./AddBookForm";

const BookList = () => {
  const dispatch = useDispatch();
  const { books, status } = useSelector((state) => state.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const pageSize = 2;

  // Fetch books when searchTerm, sortOrder, or currentPage changes
  React.useEffect(() => {
    dispatch(fetchBooks({ title: searchTerm, sort: sortOrder, page: currentPage, limit: pageSize }));
  }, [dispatch, searchTerm, sortOrder, currentPage, pageSize]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = () => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  // Handle pagination
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
  };

  // Handle edit book click
  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowAddForm(true);
  };

  return (
    <div>
      <BookSearch onSearch={handleSearch} onAdd={() => setShowAddForm(true)} />
      <BookTable
        books={books || []}
        onSort={handleSort}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        onEdit={handleEditBook} // Pass edit handler
      />
      {showAddForm && (
        <AddBookForm onClose={() => setShowAddForm(false)} bookToEdit={editingBook} />
      )}
    </div>
  );
};

export default BookList;
