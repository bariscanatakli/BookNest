import { Row, Col, Layout, Spin, Alert } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import "./content.css";

const { Content: AntContent } = Layout;

function Content() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching books");
        setLoading(false);
        console.log(error)
      });
  }, []);

  const handleSearch = (query) => {
    setLoading(true);
    axios
      .get("http://localhost:5000/books/search?query=${query}")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error searching books");
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <AntContent style={{ padding: "0 50px" }}>
      <div className="site-layout-content">
        <h1>Books</h1>
        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" />}
        {!loading && !error && (
          <div className="centered-row">
            <Row gutter={[16, 16]}>
              {books.map((book) => (
                <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                  <BookCard book={book} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </AntContent>
  );
}

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const onSearch = () => {
    handleSearch(query);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default Content;
