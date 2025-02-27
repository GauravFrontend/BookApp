import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddBookForm from "./AddBookForm";

const BookList = () => {
  const { books, status } = useSelector((state) => state.books);
  const bookData = books?.data || [];

  const [editingBook, setEditingBook] = useState(null);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Failed to load books.</p>;

  return (
    <div>
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Writer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookData.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button className="edit-button" onClick={() => setEditingBook(book)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingBook && <AddBookForm onClose={() => setEditingBook(null)} bookToEdit={editingBook} />}
    </div>
  );
};

export default BookList;
