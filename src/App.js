import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";


function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage onSearch={handleSearch} />} />
        <Route path="/search" element={<SearchResults query={searchQuery} />} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/terms" element={<TermsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
