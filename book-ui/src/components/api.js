// api.js

export const getAllBooks = () => {
  return fetch("http://localhost:8080/api/books")
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching books:", error);
      throw error; // Rethrow the error for the caller to handle
    });
};

export const addBook = (bookData) => {
  return fetch("http://localhost:8080/api/books/addBook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error adding book:", error);
      throw error; // Rethrow the error for the caller to handle
    });
};

export const updateBook = (bookId, bookData) => {
  return fetch(`http://localhost:8080/api/books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(`Error updating book with ID ${bookId}:`, error);
      throw error; // Rethrow the error for the caller to handle
    });
};
