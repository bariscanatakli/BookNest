// frontend/src/components/BookModal.jsx
import PropTypes from "prop-types";
import { Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import BookCard from "../BookCard.jsx";

const BookRecommendate = ({ isVisible, onCancel, bookId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isInitialMount = useRef(true); // Ref to track initial mount

  useEffect(() => {
    if (isInitialMount.current) {
      // If it's the initial mount, set the ref to false and return
      isInitialMount.current = false;
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:5000/books/recommendations/${bookId}`)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching books");
        setLoading(false);
        console.error(error);
      });
  }, [isVisible]);
  return (
    <Modal
      footer={null}
      visible={isVisible}
      onCancel={onCancel}
      bodyStyle={{
        backgroundColor: "#f5ebe0",
        padding: "20px",
        borderRadius: "10px",
        transition: "all 0.3s ease",
      }}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      width={750}
      closable={false}
    >
      <h1>Recommendate</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

      {error && <p>{error}</p>}

      {loading && <p>Loading...</p>}

      <button onClick={onCancel}>Close</button>
    </Modal>
  );
};

BookRecommendate.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    publishDate: PropTypes.number.isRequired,
    publisher: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default BookRecommendate;
