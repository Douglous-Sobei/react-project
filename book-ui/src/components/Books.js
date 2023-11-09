import React from "react";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
    };
    this.getAllBooks = this.getAllBooks.bind(this);
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

  render() {
    return (
      <div>
        <button type="button" onClick={this.getAllBooks}>
          Get All Books
        </button>
        <button type="button">Add Book</button>
        <table>
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
      </div>
    );
  }
}

export default Books;
