import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions";
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    axios
      .post("http://localhost:5000/users/login", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        dispatch(loginSuccess(response.data.token));
        notification.success({
          message: "Login successful",
          description: "You have successfully logged in.",
          placement: "bottomLeft",

        });
      })
      .catch((error) => {
        notification.error({
          message: "Login failed",
          description: error.message,
          placement: "bottomLeft",

        });
      });
  };

  return (
    <>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          marginBottom: "20px",
          marginTop: "20px",
          textAlign: "center",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Sign in
      </h1>
      <Form
        style={{
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#f5ebe0",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
          marginBottom: "20px",
          marginTop: "20px",
          textAlign: "center",
        }}
        className="signin-form"
        onFinish={handleSubmit}
      >
        <Form.Item
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            marginTop: "20px",
          }}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              backgroundColor: "#f5ebe0",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "16px",
            textAlign: "center",
            marginTop: "20px",
          }}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
              marginTop: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              backgroundColor: "#f5ebe0",
            }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              backgroundColor: "#d6ccc2",

              borderRadius: "10px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "10px",
              fontWeight: "bold",
              fontSize: "16px",
              textAlign: "center",
              color: "black",
              height: "50px",
            }}
            type="primary"
            htmlType="submit"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Signin;
