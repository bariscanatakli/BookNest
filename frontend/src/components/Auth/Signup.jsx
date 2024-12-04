import React from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";

function Signup() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSubmit = (values) => {
    if (password !== confirmPassword) {
      notification.info({
        message: "Passwords do not match",
        description: "Please enter the same password in both fields.",
        placement: "bottomLeft",

      });
    } else {
      axios
        .post("http://localhost:5000/users/register", {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data);
          notification.success({
            message: "Signup successful",
            description: "You have successfully signed up.",
          placement: "bottomLeft",

          });
        })
        .catch((error) => {
          console.log(error);
          notification.error({
            message: "Signup failed",
            description: error.message,
          placement: "bottomLeft",

          });
        });
    }
  };

  return (
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
      onFinish={handleSubmit}
      className="signup-form"
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
        <Input.Password
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
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
        name="confirmPassword"
        rules={[
          { required: true, message: "Please input your confirm password!" },
        ]}
      >
        <Input.Password
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
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
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Signup;
