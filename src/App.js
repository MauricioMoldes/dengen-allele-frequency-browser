import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/Search";
import SearchResults from "./pages/SearchResults";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";

// In App.js or wherever your routes change
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-33YCZ76BTH", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
}


function AppRoutes({ onSearch, searchQuery }) {
  usePageTracking(); // 👈 Track page views

  return (
    <Routes>
      <Route path="/" element={<SearchPage onSearch={onSearch} />} />
      <Route path="/search" element={<SearchResults query={searchQuery} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <Router>
      <AppRoutes onSearch={handleSearch} searchQuery={searchQuery} />
    </Router>
  );
}

export default App;
