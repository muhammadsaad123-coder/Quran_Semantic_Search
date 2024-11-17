import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../Styles/Home.css";
import background from "../Assets/greenbg.jpg";
import searchLogo from "../Assets/searchlogo.png";

function Home() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("keyword"); // Default to keyword search
  const [ngramType, setNgramType] = useState("unigram"); // Default to unigram
  const [showNgramDropdown, setShowNgramDropdown] = useState(true); // Show or hide n-gram options
  const [results, setResults] = useState([]); // Store search results
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const [error, setError] = useState(null); // Error handling
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async () => {
    setLoading(true); // Show loading spinner
    setSearchQuery(query); // Update searchQuery with the current input before the search

    try {
      console.log("Sending search request to backend...");
      const response = await axios.post("http://localhost:4000/search", {
        query,
        searchType,
        ngramType: searchType === "keyword" ? ngramType : "", // Send ngramType only for keyword search
      });

      console.log("Search response received:", response.data);

      if (response.data.error) {
        setError(response.data.error); // Show backend error
        setResults([]); // Clear previous results
      } else {
        setResults(response.data); // Set search results
        setError(null); // Clear any previous error
      }
      setQuery(""); // Clear the search bar
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to retrieve search results. Please check your backend server or query input.");
      setResults([]); // Clear previous results
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Handle search type change (keyword/semantic)
  const handleSearchTypeChange = (e) => {
    const selectedSearchType = e.target.value;
    setSearchType(selectedSearchType);

    // Show n-gram dropdown only if keyword search is selected
    if (selectedSearchType === "keyword") {
      setShowNgramDropdown(true); // Show n-gram options for keyword search
    } else {
      setShowNgramDropdown(false); // Hide n-gram options for semantic search
      setNgramType(""); // Clear n-gram type for semantic search
    }
  };

  // Handle Enter key press event in the search bar
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  // Helper function to highlight search term(s) in the text
  const highlightText = (text, query) => {
    if (!text || !query || typeof text !== "string" || typeof query !== "string") {
      return text; // Return the original text if not a valid string
    }

    const terms = query.split(/\s+/);
    let highlightedText = text;

    terms.forEach((term) => {
      const regex = new RegExp(`(${term})`, "gi"); // Case-insensitive matching
      highlightedText = highlightedText.replace(
        regex,
        '<span style="background-color: yellow; font-weight: bold;">$1</span>'
      );
    });

    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="home" style={{ backgroundImage: `url(${background})` }}>
      <nav className="navbar">
        <div className="left-nav">
          <img src={searchLogo} alt="Logo" className="navbar-logo" />
          <span className="left-nav">Quran Semantic Search</span>
        </div>
        <div className="right-nav">
          <NavLink to="/home" activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/about" activeClassName="active">
            About
          </NavLink>
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
          <NavLink to="/signup">
            <button>Signup</button>
          </NavLink>
        </div>
      </nav>

      <div className="search-section">
        <img src={searchLogo} alt="Quran Semantic Search Logo" className="logo2" />

        <input
          type="text"
          placeholder="Search Quran..."
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <select className="dropdown" onChange={handleSearchTypeChange} value={searchType}>
          <option value="keyword">Keyword Search</option>
          <option value="semantic">Contextual Search</option>
        </select>

        {showNgramDropdown && (
          <select className="dropdown" onChange={(e) => setNgramType(e.target.value)} value={ngramType}>
            <option value="unigram">Single Word Search</option>
            <option value="bigram">Word Pair Search</option>
          </select>
        )}

        <div>
          <button className="button" onClick={handleSearch}>
            Search
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>

        {/* Loader and Loading Text */}
        {loading && (
          <div>
            <div className="loading-spinner"></div>
            <div className="loading-text"> <strong>Searching...</strong></div>
          </div>
        )}
      </div>

      <div className="results-section">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          !loading &&
          searchQuery &&
          results.length === 0 && (
            <p className="no-results-message">
              No results found for "{searchQuery}".
            </p>
          )
        )}
        {/* Show results if there are any */}
        {results.length > 0 &&
          results.map((result, index) => (
            <div key={index}>
              <h3>Most similar verse {index + 1}</h3>
              <p>
        <strong>Verse No:</strong> {result.SrNo}
      </p>
      <p>
        <strong>Preprocessed Translation:</strong>{" "}
        {searchType === "keyword" && (ngramType === "unigram" || ngramType === "bigram")
          ? highlightText(result.Translation || "", searchQuery)
          : result.Translation}
      </p>
      <p>
        <strong>Original Arabic Text:</strong>{" "}
        {searchType === "keyword" && (ngramType === "unigram" || ngramType === "bigram")
          ? highlightText(result["Original Arabic Text"] || "", searchQuery)
          : result["Original Arabic Text"]}
      </p>

      <p>
        <strong>SurahNameArabic:</strong>{" "}
        {searchType === "keyword" && (ngramType === "unigram" || ngramType === "bigram")
          ? highlightText(result["SurahNameArabic"] || "", searchQuery)
          : result["SurahNameArabic"]}
      </p>
      <p>
        <strong>Original English Translation:</strong> {result.OriginalEnglishTranslation}
      </p>
      <p>
  <strong>Relevance Score:</strong> {result["Similarity Score"] !== undefined ? (result["Similarity Score"] * 100).toFixed(2) + "%" : "N/A"}
</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
