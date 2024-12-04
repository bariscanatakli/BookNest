import { Footer as AntFooter } from "antd/lib/layout/layout";
function Footer() {
  return (
    <AntFooter
      style={{
        textAlign: "center",
        backgroundColor: "#d5bdaf",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "10px",
          marginTop: "10px",
          textAlign: "center",
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        ©{new Date().getFullYear()} Mugla Sitki Kocman University 2024 -
        Software Engineering - Fundamentals of Database Systems - Barış Can
        Ataklı
      </h1>
    </AntFooter>
  );
}

export default Footer;
