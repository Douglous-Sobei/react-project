import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Books from "./Books";
import SingleBook from "./SingleBook";
import EditBook from "./EditBook";
import AddBook from "./AddBook";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Books />} />
      <Route path="/view-book/:id" element={<SingleBook />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
      <Route path="/add-book" element={<AddBook />} />
    </Routes>
  </Router>
);
