import {
  Row,
  Col,
  Layout,
  Spin,
  Alert,
  Modal,
  InputNumber,
  Select,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, searchBooks, filterBooks } from "../../redux/actions";
import BookCard from "./BookCard";
import "./content.css";

const { Content } = Layout;
const { Option } = Select;

function HomePage() {
  const dispatch = useDispatch();
  const {
    books,
    filteredBooks,
    recommendations,
    filteredRecommendations,
    loading,
    error,
  } = useSelector((state) => state.books);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    rating: undefined,
    awardCount: undefined,
    formatType: undefined,
    genres: [],
    seriesCount: undefined,
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  const handleSearch = (query) => {
    dispatch(searchBooks(query));
  };

  const handleFilter = () => {
    dispatch(filterBooks(filters));
    console.log(books);
    setIsModalVisible(false);
  };

  return (
    <Content style={{ padding: "0 50px" }}>
      <div className="site-layout-content">
        <h1>Books</h1>
        <SearchBar
          setFilters={setFilters}
          handleSearch={handleSearch}
          showFilterModal={() => setIsModalVisible(true)}
        />
        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" />}
        {recommendations && recommendations.length !== 0 && (
          <>
            <h1
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#f5ebe0",
                backgroundColor: "#d5bdaf",
                padding: "10px",
                borderRadius: "10px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginBottom: "20px",
                fontWeight: "bold",
                fontSize: "24px",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Recommendations of + {recommendations[0].title}{" "}
              <button
                style={{
                  marginLeft: "10px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#f5ebe0",
                  color: "#d5bdaf",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  dispatch({ type: "REMOVE_RECOMMENDATIONS" });
                  dispatch(fetchBooks());
                }}
              >
                Click the Remove
              </button>
            </h1>
          </>
        )}
        {!loading && !error && (
          <div
            className="centered-row"
            style={{
              marginTop: "20px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "1400px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "30px",
              backgroundColor: "#f5ebe0",
              marginBottom: "20px",
              overflow: "auto",
              height: "auto",
              maxHeight: "800px",
              overflowY: "scroll",
              scrollbarWidth: "none",
              WebkitScrollbarWidth: "none",
              msOverflowStyle: "none",
              overflowX: "hidden",
              WebkitTransform: "translateZ(0)",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {console.log(
              books,
              filteredBooks,
              recommendations,
              filteredRecommendations
            )}
            <Row gutter={[16, 16]}>
              {recommendations.length === 0 && books.length === 0 && (
                <h1>No books found</h1>
              )}
              {recommendations.length === 0
                ? filteredBooks.length === 0
                  ? books.map((book) => (
                      <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                        <BookCard book={book} />
                      </Col>
                    ))
                  : filteredBooks.map((book) => (
                      <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                        <BookCard book={book} />
                      </Col>
                    ))
                : filteredRecommendations.length === 0
                ? recommendations.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))
                : filteredRecommendations.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))}
              {/* {recommendations.length === 0 && filteredBooks.length === 0
                ? books.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))
                : filteredBooks.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))} */}

              {/* {books && filteredBooks.length === 0
                ? books.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))
                : filteredBooks.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))}

              {recommendations && filteredRecommendations
                ? recommendations.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))
                : filteredRecommendations.map((book) => (
                    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6}>
                      <BookCard book={book} />
                    </Col>
                  ))} */}
            </Row>
          </div>
        )}
        <FilterModal
          isVisible={isModalVisible}
          filters={filters}
          setFilters={setFilters}
          handleFilter={handleFilter}
          onClose={() => setIsModalVisible(false)}
        />
      </div>
    </Content>
  );
}

const SearchBar = ({ handleSearch, showFilterModal, setFilters }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const onSearch = () => {
    handleSearch(query);
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        textAlign: "center",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "500px",
      }}
    >
      <input
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#f5ebe0",
          color: "black",
        }}
        type="text"
        placeholder="Search books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        style={{
          width: "75%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#d6ccc2",
          color: "black",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={onSearch}
      >
        Search
      </button>
      <button
        style={{
          width: "50%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#d6ccc2",
          color: "black",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginTop: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
        onClick={showFilterModal}
      >
        Filter
      </button>
      <button
        style={{
          width: "30%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#d6ccc2",
          color: "black",
          cursor: "pointer",
          transition: "all 0.3s ease",
          marginTop: "10px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
        onClick={() => {
          setQuery("");
          setFilters({
            rating: undefined,
            awardCount: undefined,
            formatType: undefined,
            genres: [],
            seriesCount: undefined,
          });
          dispatch({ type: "REMOVE_FILTERS" });
        }}
      >
        Remove Filter
      </button>
    </div>
  );
};

const FilterModal = ({
  isVisible,
  filters,
  setFilters,
  handleFilter,
  onClose,
}) => {
  return (
    <Modal
      title="Filter Books"
      visible={isVisible}
      onOk={handleFilter}
      onCancel={() => {
        onClose;
        setFilters({
          rating: undefined,
          awardCount: undefined,
          formatType: undefined,
          genres: [],
          seriesCount: undefined,
        });
      }}
    >
      <div>
        <label>Rating:</label>
        <InputNumber
          min={1}
          max={5}
          value={filters.rating}
          onChange={(value) => setFilters({ ...filters, rating: value })}
        />
      </div>
      <div>
        <label>Award Count:</label>
        <InputNumber
          min={0}
          value={filters.awardCount}
          onChange={(value) => setFilters({ ...filters, awardCount: value })}
        />
      </div>
      <div>
        <label>Format Type:</label>
        <Select
          value={filters.formatType}
          onChange={(value) => setFilters({ ...filters, formatType: value })}
          style={{ width: "100%" }}
        >
          <Option value="Hardcover">Hardcover</Option>
          <Option value="Paperback">Paperback</Option>
          <Option value="E-book">E-book</Option>
          <Option value="Audiobook">Audiobook</Option>
        </Select>
      </div>
      <div>
        <label>Genres:</label>
        <Select
          mode="multiple"
          value={filters.genres}
          onChange={(value) => setFilters({ ...filters, genres: value })}
          style={{ width: "100%" }}
        >
          <Option value="Fantasy">Fantasy</Option>
          <Option value="Fiction">Fiction</Option>
          <Option value="Adult">Adult</Option>
          <Option value="Science Fiction Fantasy">
            Science Fiction Fantasy
          </Option>
          <Option value="Retellings">Retellings</Option>
          <Option value="Adult Fiction">Adult Fiction</Option>
          <Option value="Magic">Magic</Option>
          <Option value="Witches">Witches</Option>
          <Option value="Fairy Tales">Fairy Tales</Option>
          <Option value="Classics">Classics</Option>
          {/* Add more genres as needed */}
        </Select>
      </div>
      <div>
        <label>Series Count:</label>
        <InputNumber
          min={0}
          value={filters.seriesCount}
          onChange={(value) => setFilters({ ...filters, seriesCount: value })}
        />
      </div>
    </Modal>
  );
};

export default HomePage;
