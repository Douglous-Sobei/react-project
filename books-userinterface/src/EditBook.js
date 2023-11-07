// src/EditBook.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({ title: "", id: 0 });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/books/${id}`)
      .then((res) => {
        setBook({ title: res.data.title, id: res.data.id });
      })
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setBook({
      ...book,
      title: e.target.value,
    });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/api/books/${id}`, book)
      .then(() => {
        // Handle successful update
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <h2>Edit Book</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={book.title}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update Book
      </button>
    </div>
  );
}

export default EditBook;
