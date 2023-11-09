import React, { Component } from "react";
import {
  getAllBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBookById,
} from "./api";

class Books extends Component {
  state = {
    allBooks: [],
    singleBook: {
      title: "",
      id: 0,
    },
    isUpdate: false,
    isView: false,
    isModalOpen: false,
  };

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    getAllBooks()
      .then((result) => {
        this.setState({
          allBooks: result,
        });
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  handleChange = (e) => {
    this.setState({
      singleBook: {
        ...this.state.singleBook,
        title: e.target.value,
      },
    });
  };

  handleUpdateBook = () => {
    const { id, title } = this.state.singleBook;

    const onSuccess = () => {
      this.setState({
        singleBook: { title: "", id: 0 },
        isUpdate: false,
        isModalOpen: false,
      });
      this.getAllBooks();
    };

    if (id) {
      updateBook(id, { title })
        .then(onSuccess)
        .catch((error) => console.error("Error updating Book:", error));
    } else {
      addBook(this.state.singleBook)
        .then(onSuccess)
        .catch((error) => console.error("Error adding Book:", error));
    }
  };

  getBookDetails = (bookId) => {
    getBookById(bookId)
      .then((result) => {
        this.setState({
          singleBook: {
            id: result.id,
            title: result.title,
          },
          isUpdate: true,
          isModalOpen: true,
          isView: false,
        });
      })
      .catch((error) =>
        console.error(`Error fetching book with ID ${bookId}:`, error)
      );
  };

  viewBookDetails = (bookId) => {
    getBookById(bookId)
      .then((result) => {
        this.setState({
          singleBook: {
            id: result.id,
            title: result.title,
          },
          isUpdate: false,
          isModalOpen: true,
          isView: true,
        });
      })
      .catch((error) =>
        console.error(`Error fetching book with ID ${bookId}:`, error)
      );
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      singleBook: { title: "", id: 0 },
      isUpdate: false,
      isView: false,
    });
  };

  deleteBook = (bookId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmed) return;

    deleteBookById(bookId)
      .then((data) => {
        if (data.message === "Book deleted successfully") {
          this.getAllBooks(); // Refresh the book list after successful deletion
        } else {
          throw new Error("Error deleting book");
        }
      })
      .catch((error) =>
        console.error(`Error deleting book with ID ${bookId}:`, error)
      );
  };

  render() {
    return (
      <div className="container">
        <span className="title-bar">
          <button
            className="btn btn-primary"
            type="button"
            onClick={this.getAllBooks}
          >
            Get All Books
          </button>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.openModal}
          >
            Add Book
          </button>
        </span>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.allBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-info mr-1"
                    onClick={() => this.viewBookDetails(book.id)}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-success mr-1"
                    onClick={() => this.getBookDetails(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.deleteBook(book.id)} // Ensure that book.id is passed here
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className={`modal fade ${this.state.isModalOpen ? "show" : ""}`}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: this.state.isModalOpen ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={this.closeModal}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.state.isView && (
                  <>
                    <h5>Book Details</h5>
                    <p>ID: {this.state.singleBook.id}</p>
                    <p>Title: {this.state.singleBook.title}</p>
                  </>
                )}
                {!this.state.isView && (
                  <>
                    <label htmlFor="title">Enter Book Name</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.singleBook.title}
                      onChange={this.handleChange}
                    />
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.closeModal}
                >
                  Close
                </button>
                {!this.state.isView && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleUpdateBook}
                  >
                    Save changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
