import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "../store/bookSlice";
import "./AddBookForm.css";

const AddBookForm = ({ onClose, bookToEdit }) => {
  const [bookData, setBookData] = useState({
    author: "",
    country: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookToEdit) {
      setBookData(bookToEdit);
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookToEdit) {
      dispatch(updateBook(bookData)); 
    } else {
      dispatch(addBook(bookData)); 
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{bookToEdit ? "Edit Book" : "Add New Book"}</h3>
        <form onSubmit={handleSubmit}>
          {Object.keys(bookData).map((key) => (
            <div key={key} className="input-group">
              <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                name={key}
                placeholder={`Enter ${key}`}
                value={bookData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {bookToEdit ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
