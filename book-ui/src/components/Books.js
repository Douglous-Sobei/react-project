import React, { Component } from "react";
import { getAllBooks, addBook, updateBook } from "./api";

class Books extends Component {
  state = {
    allBooks: [],
    singleBook: {
      title: "",
      id: 0,
    },
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

  handleAddBook = () => {
    const { id, title } = this.state.singleBook;

    const onSuccess = () => {
      this.setState({ singleBook: { title: "", id: 0 } });
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

  getBook = (bookId) => {
    const selectedBook = this.state.allBooks.find((book) => book.id === bookId);
    this.setState({
      singleBook: {
        id: selectedBook.id,
        title: selectedBook.title,
      },
    });
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
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Add Book
          </button>
        </span>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Action</th>
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
                    className="btn btn-info"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.getBook(book.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
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
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label htmlFor="title">Enter Book Name</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={this.state.singleBook.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleAddBook}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
