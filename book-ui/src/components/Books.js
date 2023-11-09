import React from "react";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      singleBook: {
        name: "",
        id: 0,
      },
    };
    this.getAllBooks = this.getAllBooks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
  }
  getAllBooks() {
    fetch("http://localhost:8080/api/books")
      .then((res) => res.json()) // <-- Return the promise here
      .then((result) => {
        this.setState({
          allBooks: result,
        });
      })
      .catch(console.log);
  }
  handleChange(e) {
    this.setState({
      singleBook: {
        name: e.target.value,
      },
    });
  }
  handleAddBook(){
    // Logic to call POST method of API
    
  }
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

        <table className="table table-straped">
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
                <td>Edit Delete</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
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
                  value={this.state.singleBook.name}
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
