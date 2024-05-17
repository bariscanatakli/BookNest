// frontend/src/components/BookCard.jsx
import PropTypes from "prop-types";
import { Card, Button, Modal } from "antd";
import { useState } from "react";

const { Meta } = Card;

const BookCard = ({ book }) => {
  const { author, coverImg, title, publishDate, publisher, pages, description } = book;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
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
        onClick={showModal}
      >
        Details
      </Button>
      <Modal
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
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
  }).isRequired,
};

export default BookCard;
