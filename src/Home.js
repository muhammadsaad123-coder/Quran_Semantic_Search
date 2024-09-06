import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Home.css';
import background from './background2.png';
import searchLogo from './searchlogo.png';

function Home() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('keyword');
  const [ngramType, setNgramType] = useState('unigram');
  const [showNgramDropdown, setShowNgramDropdown] = useState(true);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Track search query

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:4000/search', {
        query,
        searchType,
        ngramType,
      });
      setResults(response.data);
      setSearchQuery(query); // Store the search query
      setQuery(''); // Clear the search bar
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearchTypeChange = (e) => {
    const selectedSearchType = e.target.value;
    setSearchType(selectedSearchType);

    if (selectedSearchType === 'keyword') {
      setShowNgramDropdown(true);
    } else {
      setShowNgramDropdown(false);
      setNgramType('');
    }
  };

  // Helper function to highlight and bold search term(s) in the text
  const highlightText = (text, query) => {
    if (!query.trim()) return text;

    // Split the query into words
    const terms = query.split(/\s+/);
    let highlightedText = text;

    // Highlight each term
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span style="background-color: yellow; font-weight: bold;">$1</span>');
    });

    // Use dangerouslySetInnerHTML to render HTML
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
          <NavLink to="/home" activeClassName="active" exact>Home</NavLink>
          <NavLink to="/about" activeClassName="active">About</NavLink>
          <NavLink to="/login"><button>Login</button></NavLink>
          <NavLink to="/signup"><button>Signup</button></NavLink>
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
        />
        
        <select className="dropdown" onChange={handleSearchTypeChange} value={searchType}>
          <option value="keyword">Keyword</option>
          <option value="semantic">Semantic Search</option>
        </select>

        {showNgramDropdown && (
          <select className="dropdown" onChange={(e) => setNgramType(e.target.value)} value={ngramType}>
            <option value="unigram">Unigram</option>
            <option value="bigram">Bigram</option>
          </select>
        )}

        <div>
          <button className="button" onClick={handleSearch}>
            Search ...
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="results-section">
        {results.map((result, index) => (
          <div key={index}>
            <h3>Most similar document {index + 1}</h3>
            <p>VerseNo: {result.srNo}</p>
            <p>
              Translation: {highlightText(result.translation, searchQuery)}
            </p>
            <p>
              Original Arabic Text: {highlightText(result.originalArabicText, searchQuery)}
            </p> 
            <p>Similarity Score: {result.similarityScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
