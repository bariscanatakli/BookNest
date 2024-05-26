import { useState } from "react";
import { Menu, Modal } from "antd";
import Signin from "../Auth/Signin.jsx";
import Signup from "../Auth/Signup.jsx";

const RightMenu = (props) => {
  const [signinVisible, setSigninVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);

  const showModal = (type) => {
    if (type === "signin") {
      setSigninVisible(true);
    } else if (type === "signup") {
      setSignupVisible(true);
    }
  };

  const handleCancel = (type) => {
    if (type === "signin") {
      setSigninVisible(false);
    } else if (type === "signup") {
      setSignupVisible(false);
    }
  };

  return (
    <>
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a onClick={() => showModal("signin")}>Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a onClick={() => showModal("signup")}>Signup</a>
        </Menu.Item>
      </Menu>

      <Modal
        bodyStyle={{
          backgroundColor: "#f5ebe0",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
          fontSize: "16px",
          textAlign: "center",
          fontWeight: "bold",
          color: "black",
        }}
        footer={null}
        visible={signinVisible}
        onOk={() => handleCancel("signin")}
        onCancel={() => handleCancel("signin")}
      >
        <Signin />
      </Modal>

      <Modal
        bodyStyle={{
          backgroundColor: "#f5ebe0",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ccc",
          fontSize: "16px",
          textAlign: "center",
          fontWeight: "bold",
          color: "black",
        }}
        footer={null}
        visible={signupVisible}
        onOk={() => handleCancel("signup")}
        onCancel={() => handleCancel("signup")}
      >
        <Signup />
      </Modal>
    </>
  );
};

export default RightMenu;
