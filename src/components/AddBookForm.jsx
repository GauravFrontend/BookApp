import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBook, editBook } from "../store/bookSlice";
import "./AddBookForm.css";

const AddBookForm = ({ onClose, bookToEdit }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    country: "",
    language: "",
    link: "",
    pages: "",
    year: "",
  });

  const dispatch = useDispatch();

   useEffect(() => {
    if (bookToEdit) {
      const { id, ...restData } = bookToEdit; 
      setBookData(restData);
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookToEdit) {
      dispatch(editBook({ id: bookToEdit.id, bookData })); 
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
