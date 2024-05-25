// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Homepage";

function App() {
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
