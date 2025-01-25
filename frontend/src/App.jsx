// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import HomePage from "./components/Homepage";
import Content from "./components/Profile";
import BookCrud from "./components/BookCrud";
import { useSelector } from "react-redux";

function App(token) {
  console.log(token);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <HomePage />
              <Footer />
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <Navbar />
              {token ? <Content /> : <HomePage />}
              <Footer />
            </>
          }
        />
        <Route
          path="/admin/crud"
          element={
            <>
              <Navbar />
              {token ? <BookCrud /> : <HomePage />}
              <Footer />
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <h1>404 Not Found</h1>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
