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
        title="Signin"
        visible={signinVisible}
        onOk={() => handleCancel("signin")}
        onCancel={() => handleCancel("signin")}
      >
        <Signin />
      </Modal>

      <Modal
        title="Signup"
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

