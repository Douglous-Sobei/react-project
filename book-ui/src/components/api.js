// api.js

export const getAllBooks = () => {
  return fetch("http://localhost:8080/api/books")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
      throw error;
    });
};

export const addBook = (book) => {
  return fetch("http://localhost:8080/api/books/addBook", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error adding Book:", error);
      throw error;
    });
};

export const getBookById = (bookId) => {
  return fetch(`http://localhost:8080/api/books/${bookId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(`Error fetching book with ID ${bookId}:`, error);
      throw error;
    });
};

export const updateBook = (bookId, updatedBook) => {
  return fetch(`http://localhost:8080/api/books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(`Error updating Book with ID ${bookId}:`, error);
      throw error;
    });
};

export const deleteBookById = (bookId) => {
  return fetch(`http://localhost:8080/api/books/${bookId}`, {
    method: "DELETE",
  })
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => {
    console.error("Error deleting book:", error);
    throw error; // Rethrow the error to handle it in the component
  });
};

