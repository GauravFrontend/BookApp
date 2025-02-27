import React from "react";
import "./BookTable.css";

const BookTable = ({ books, onSort, onPageChange, currentPage, onEdit }) => {
  return (
    <div className="table-container">
      <div className="table-controls">
        <button onClick={onSort}>Sort by Title</button>
      </div>

      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Writer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(book)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default BookTable;
