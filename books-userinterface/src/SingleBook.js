import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function SingleBook() {
  const [book, setBook] = useState({ title: "", id: 0 });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/books/${id}`)
      .then((res) => {
        setBook({ title: res.data.title, id: res.data.id });
      })
      .catch(console.error);
  }, [id]);

  return (
    <div>
      <h1>Book Details</h1>
      <p>Title: {book.title}</p>
      <p>ID: {book.id}</p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}

export default SingleBook;
