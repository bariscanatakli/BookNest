import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, notification } from "antd";
import axios from "axios";

const BookCrud = () => {
  const [books, setBooks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:5000/books");
    setBooks(response.data);
  };

  const handleAdd = () => {
    setEditingBook(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    console.log(record)
    setEditingBook(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    notification.info({
      message: `Deleting book ${id}`,
      description: "Please wait while we delete your book",
      placement: "bottomLeft",
    })
    await axios.delete(`http://localhost:5000/books/${id}`);
    fetchBooks();
    notification.success({
      message: `Book ${id} deleted successfully`,
      description: "Book deleted successfully",
      placement: "bottomLeft",
    })
  };

  const handleOk = async (values) => {
    if (editingBook) {
        notification.info({
          message: `Updating book ${editingBook._id}`,
          description: "Please wait while we update your book",
          placement: "bottomLeft",
        })
        await axios.put(`http://localhost:5000/books/${editingBook._id}`, values);
        notification.success({
          message: `Book ${editingBook._id} updated successfully`,
          description: "Book updated successfully",
          placement: "bottomLeft",
        })
      } else {
        notification.info({
          message: `Adding new book`,
          description: "Please wait while we add your book",
          placement: "bottomLeft",
        })
        await axios.post("http://localhost:5000/books", values);
        notification.success({
          message: `Book added successfully`,
          description: "Book added successfully",
          placement: "bottomLeft",
        })
      }
      fetchBooks();
      setIsModalVisible(false);
      form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Genre", dataIndex: "genres", key: "genres" },
    { title: "Rating", dataIndex: "rating", key: "rating", sorter: (a, b) => a.rating - b.rating, },
    { title: "Liked Percent", dataIndex: "likedPercent", key: "likedPercent", sorter: (a, b) => a.likedPercent - b.likedPercent, },
    { title: "Price", dataIndex: "price", key: "price", sorter: (a, b) => a.price - b.price, },
    {
      title: "Published Date",
      dataIndex: "publishDate",
      key: "publishDate",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            style={{
              marginRight: "10px",
              marginLeft: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              position: "relative",
              whiteSpace: "nowrap",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              verticalAlign: "middle",
              display: "inline-block",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              backgroundColor: "#f5f5f5",
              borderColor: "#f5f5f5",
              color: "#333",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              textDecoration: "none",
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            style={{
              marginLeft: "10px",
              marginTop: "10px",
              marginBottom: "10px",
              position: "relative",
              whiteSpace: "nowrap",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              verticalAlign: "middle",
              display: "inline-block",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              backgroundColor: "#f5f5f5",
              borderColor: "#f5f5f5",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 16px",
              textDecoration: "none",
              cursor: "pointer",
              border: "none",
              outline: "none",
              color: "#ff0000",
            }}
            danger
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5ebe0",
        borderRadius: "10px",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginTop: "35px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        maxWidth: "1400px",
        margin: "0 auto",
        overflow: "auto",
        height: "auto",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        whiteSpace: "nowrap",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Button
        type="primary"
        onClick={handleAdd}
        style={{
          marginBottom: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
          position: "relative",
          whiteSpace: "nowrap",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "200px",
          height: "50px",
          borderRadius: "5px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          fontSize: "20px",
          fontWeight: "bold",
          backgroundColor: "#f5ebe0",
          color: "black",
          border: "none",
        }}
      >
        Add Book
      </Button>
      <Table
        bordered
        style={{
          width: "100%",
          maxWidth: "1400px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          overflow: "auto",
          position: "relative",
          textAlign: "center",
        }}
        size="middle"
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        title={() => <h1 style={{ textAlign: "center" }}>Book List</h1>}
        dataSource={books}
        columns={columns}
        rowKey="_id"
        rowClassName={() => "custom-row"} // Apply a custom class to rows
      />
      
      <Modal
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          borderRadius: "5px",
          padding: "10px",
          overflow: "auto",
          position: "relative",
          whiteSpace: "nowrap",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5ebe0",
          color: "black",
        }}
        footer={null}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        bodyStyle={{ backgroundColor: "#f5ebe0" }}
        width={500}
        closable={false}
        centered
        maskClosable
        onCancel={handleCancel}
        onOk={handleOk}
        visible={isModalVisible}
        okText="Save"
        okType="primary"
        cancelStyle={{ backgroundColor: "#f5ebe0", color: "black" }}
        cancelText="Cancel"
      >
        <Form form={form} onFinish={handleOk} layout="vertical">
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
              backgroundColor: "#f5ebe0",
              padding: "10px",
              borderRadius: "5px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              position: "relative",
              whiteSpace: "nowrap",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "30px",
              border: "1px solid #ccc",
              display: "inline-block",
              width: "100%",
            }}
          >
            {editingBook ? "Edit Book" : "Add Book"}
          </div>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                position: "relative",
                whiteSpace: "nowrap",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5ebe0",
                color: "black",
                border: "none",
                borderRadius: "5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: "Please input the author!" }]}
          >
            <Input
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                position: "relative",
                whiteSpace: "nowrap",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5ebe0",
                color: "black",
                border: "none",
                borderRadius: "5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="genres"
            label="Genre"
            rules={[{ required: true, message: "Please input the genres!" }]}
          >
            <Input
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                position: "relative",
                whiteSpace: "nowrap",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5ebe0",
                color: "black",
                border: "none",
                borderRadius: "5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            />
          </Form.Item>
          <Form.Item
            name="publishDate"
            label="Publish Date"
            rules={[
              { required: true, message: "Please input the publish date!" },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                position: "relative",
                whiteSpace: "nowrap",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f5ebe0",
                color: "black",
                border: "none",
                borderRadius: "5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginTop: "20px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                position: "relative",
                whiteSpace: "nowrap",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                width: "200px",
                height: "50px",
                borderRadius: "5px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                fontSize: "20px",
                fontWeight: "bold",
                backgroundColor: "#f5ebe0",
                color: "black",
                border: "none",
              }}
            >
              {editingBook ? "Edit Book" : "Add Book"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Add custom styles using CSS
const styles = `
  .ant-table-wrapper {
    background-color: #f5ebe0 !important;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19);
    border: 1px solid #ccc;
    padding: 10px;
  }
  .ant-table-thead > tr > th {
    background-color: #f5fbe0 !important;
    color: #333 !important;
    font-weight: bold !important;
    border-bottom: 1px solid #ccc !important;
  }
  .ant-table-tbody > tr > td {
    background-color: #f5fbe0 !important;
    border-bottom: 1px solid #f0f0f0 !important;
    color: #555 !important;
  }
  .ant-table-tbody > tr:nth-child(even) > td {
    background-color: #f5ebe0 !important;
  }
  .ant-table-tbody > tr:hover > td {
    background-color: #e8f4ff !important;
  }
  .ant-table-pagination {
    margin: 16px 0 !important;
  }
  .ant-pagination-item {
    border: none !important;
    background-color: #fff !important;
  }
  .ant-pagination-item-active {
    border-color: #1890ff !important;
    background-color: #1890ff !important;
  }
  .ant-pagination-item-active a {
    color: #fff !important;
  }
  .ant-pagination-item a {
    color: #1890ff !important;
  }
  .ant-table-title {
    background-color: #f5ebe0 !important;
    font-size: 1.5em !important;
    font-weight: bold !important;
    text-align: center !important;
    padding: 16px !important;
  }
`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
export default BookCrud;
