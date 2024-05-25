// frontend/src/components/BookModal.jsx
import PropTypes from "prop-types";
import { Modal } from "antd";

const BookInfo = ({ isVisible, onCancel, book }) => {
  const { author, coverImg, title, publishDate, publisher, pages, description } = book;

  return (
    <Modal
      footer={null}
      visible={isVisible}
      onCancel={onCancel}
      bodyStyle={{
        backgroundColor: "#f5ebe0",
        padding: "20px",
        borderRadius: "10px",
      }}
      maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      width={750}
      closable={false}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src={coverImg}
          alt=""
          style={{
            width: "200px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            marginRight: "20px",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "18px", margin: "10px 0" }}>{`Title: ${title}`}</p>
          <p style={{ fontSize: "18px", margin: "10px 0" }}>{`Author: ${author}`}</p>
          <p style={{ fontSize: "18px", margin: "10px 0" }}>{`Year: ${new Date(publishDate).getFullYear()}`}</p>
          <p style={{ fontSize: "18px", margin: "10px 0" }}>{`Publisher: ${publisher}`}</p>
          <p style={{ fontSize: "18px", margin: "10px 0" }}>{`Pages: ${pages}`}</p>
        </div>
      </div>
      <p style={{ fontSize: "16px", lineHeight: "1.5", textAlign: "justify" }}>{`Description: ${description}`}</p>
    </Modal>
  );
};

BookInfo.propTypes = {
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

export default BookInfo;
