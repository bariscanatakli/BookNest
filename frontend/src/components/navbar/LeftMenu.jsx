import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const LeftMenu = ({ mode }) => {
  const { token } = useSelector((state) => state.auth);

  return (
    <Menu mode={mode}>
      <Menu.Item key="home">
        <Link to="/home">Books</Link>
      </Menu.Item>
      {token && (
        <>
          <Menu.Item key="crud" icon={<StarOutlined />}>
            <Link to="/admin/crud">Book CRUD</Link>
          </Menu.Item>
          <Menu.Item key="profile" icon={<UserOutlined />}>
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default LeftMenu;
