import React from "react";
import { Layout, Avatar, Descriptions, Row, Col, Card } from "antd";

const { Header, Content } = Layout;

const ProfilePage = () => {
  return (
    <Layout
      style={{
        backgroundColor: "#f5ebe0",
        padding: "20px",
        marginTop: "30px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "calc(100vh - 60px)",
      }}
    >
      <Header
        style={{
          backgroundColor: "#d5bdaf",
          padding: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "24px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h1
          style={{
            margin: "0",
            fontWeight: "bold",
            fontSize: "24px",
            color: "black",
            textAlign: "center",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Profile Page
        </h1>
      </Header>
      <Content
        style={{
          padding: "20px",
          backgroundColor: "#f5ebe0",
          borderRadius: "10px",
          border: "1px solid #ccc",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Row justify="center" align="middle" gutter={[16, 16]} wrap>
          <Col span={24} xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              style={{
                borderRadius: "10px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                marginTop: "20px",
                marginBottom: "20px",
                backgroundColor: "#f5ebe0",
                color: "black",
                fontWeight: "bold",
                fontSize: "16px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                fontFamily: "Arial, sans-serif",
                textAlign: "center",
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              <Row wrap justify="center" align="middle" gutter={[16, 16]}>
                <Avatar
                  style={{
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                  size={100}
                  shape="circle"
                  alt="User Avatar"
                  src={`https://xsgames.co/randomusers/assets/avatars/pixel/${
                    Math.floor(Math.random() * 50) + 1
                  }.jpg`}
                />
              </Row>
              <Descriptions
                style={{
                  marginTop: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  fontFamily: "Arial, sans-serif",
                  textAlign: "center",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "black",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#f5ebe0",
                  padding: "20px",
                }}
                title="User Info"
                bordered
                column={1}
              >
                <Descriptions.Item
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: "10px",
                    backgroundColor: "#f5ebe0",
                    padding: "20px",
                  }}
                  label="Name"
                >
                  John Doe
                </Descriptions.Item>
                <Descriptions.Item
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: "10px",
                    backgroundColor: "#f5ebe0",
                    padding: "20px",
                  }}
                  label="Username"
                >
                  johndoe
                </Descriptions.Item>
                <Descriptions.Item
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: "10px",
                    backgroundColor: "#f5ebe0",
                    padding: "20px",
                  }}
                  label="Email"
                >
                  johndoe@example.com
                </Descriptions.Item>
                <Descriptions.Item
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: "10px",
                    backgroundColor: "#f5ebe0",
                    padding: "20px",
                  }}
                  label="Phone"
                >
                  123-456-7890
                </Descriptions.Item>
                <Descriptions.Item
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    fontFamily: "Arial, sans-serif",
                    textAlign: "center",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    borderRadius: "10px",
                    backgroundColor: "#f5ebe0",
                    padding: "20px",
                  }}
                  label="Address"
                >
                  123 Main Street, City, Country
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginTop: "20px",
            color: "black",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: "48px",
          }}
        >
          Under Production
        </h1>
      </Content>
    </Layout>
  );
};

export default ProfilePage;
