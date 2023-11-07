import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);

  const getAllBooks = () => {
    axios
      .get("http://localhost:8080/api/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/books/${id}`)
      .then(() => {
        alert("Book deleted successfully!");
        getAllBooks(); // Refresh the list of books after deletion
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
        alert("An error occurred while deleting the book. Please try again.");
      });
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/add-book">
                Add Book
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="title-bar">
        <button className="btn btn-primary" type="button" onClick={getAllBooks}>
          Get Books
        </button>
        <Link to="/add-book" className="btn btn-info">
          Add Book
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>
                <Link to={`/view-book/${book.id}`} className="btn btn-info">
                  View
                </Link>
                <Link to={`/edit-book/${book.id}`} className="btn btn-warning">
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
