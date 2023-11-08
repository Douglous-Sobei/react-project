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
    //  Logic to fetch data from API /api/books
    fetch("http://localhost:8080/api/books")
      .then((res) => {
        res.json();
      })
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
      </div>
    );
  }
}

export default Books;
