// frontend/src/components/BookCard.jsx
import PropTypes from "prop-types";
import { Card, Button, Modal, notification } from "antd";
import { useState } from "react";
import BookInfo from "./modals/BookInfo.jsx";
import { fetchBooks, fetchRecommendedBooks } from "../../redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const { Meta } = Card;

const successNotification = (placement, description) => {
  notification.success({
    message: `Success!`,
    description: description,
    placement,
  });
};
const errorNotification = (placement, description) => {
  notification.error({
    message: `There is a problem!`,
    description: description,
    placement,
  });
};

const BookCard = ({ book, setBooks, setLoading, setError }) => {
  const dispatch = useDispatch();
  const { author, coverImg, title } = book;
  const { books, recommendations, filteredBooks, filteredRecommendations } = useSelector((state) => state.books);
  const [isModalVisibleBookInfo, setIsModalVisibleBookInfo] = useState(false);
  const showModalBookInfo = () => {
    setIsModalVisibleBookInfo(true);
  };

  const handleCancelBookInfo = () => {
    setIsModalVisibleBookInfo(false);
  };
  const fetchRecommendations = () => {
    dispatch(fetchRecommendedBooks(book.bookId));
  };

  const handleDeleteBook = async () => {
   
    notification.info({
      message: `Deleting book ${book._id}`,
      description: "Please wait while we delete your book",
      placement: "bottomLeft",
    })
    await axios.delete(`http://localhost:5000/books/${book._id}`);
    notification.success({
      message: `Book ${book._id} deleted successfully`,
      description: "Book deleted successfully",
      placement: "bottomLeft",
    })
    dispatch(fetchBooks())
  };
  return (
    <Card
      style={{
        width: 240,
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        backgroundColor: "#f5ebe0",
        border: "none",
        color: "black",
        fontWeight: "bold",
        fontSize: "16px",
        marginTop: "20px",
      }}
      cover={<img alt="" src={coverImg} />}
    >
      <Meta
        title={title}
        description={`Author: ${author}`}
        style={{ marginBottom: "10px" }}
      />
      <Button
        style={{
          width: "100%",
          borderRadius: "4px",
          marginTop: "10px",
          backgroundColor: "#d5bdaf",
          color: "black",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "10px",
          border: "none",
          height: "40px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        block
        onClick={handleDeleteBook}
      >
        Delete
      </Button>
      <Button
        style={{
          width: "100%",
          borderRadius: "4px",
          marginTop: "10px",
          backgroundColor: "#d5bdaf",
          color: "black",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "10px",
          border: "none",
          height: "40px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        block
        onClick={showModalBookInfo}
      >
        Details
      </Button>
      <Button
        style={{
          width: "100%",
          borderRadius: "4px",
          marginTop: "10px",
          backgroundColor: "#d5bdaf",
          color: "black",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "10px",
          border: "none",
          height: "40px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        block
        onClick={() => fetchRecommendations()}
      >
        Get Recommendate
      </Button>
      <BookInfo
        isVisible={isModalVisibleBookInfo}
        onCancel={handleCancelBookInfo}
        book={book}
      />
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    publishDate: PropTypes.number.isRequired,
    publisher: PropTypes.string.isRequired,
    pages: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    bookId: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookCard;
