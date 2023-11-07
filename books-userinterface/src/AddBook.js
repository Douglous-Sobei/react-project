import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AddBook() {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/books/addBook", { title })
      .then(() => {
        alert("Book added successfully!");
        setTitle("");
      })
      .catch((error) => {
        console.error("Error adding book:", error);
        alert("An error occurred while adding the book. Please try again.");
      });
  };

  return (
    <div>
      <h1>Add New Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
        <Link to="/" className="btn btn-secondary ml-2">
          Go Back Home
        </Link>
      </form>
    </div>
  );
}

export default AddBook;
