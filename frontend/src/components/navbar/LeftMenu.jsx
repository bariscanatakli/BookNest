
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/home">Home</Link>
      </Menu.Item>
      <Menu.Item key="recommendation" icon={<StarOutlined />}>
        <Link to="/recommendation">Recommendation</Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
