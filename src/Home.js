import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Home.css';
import background from './background2.png';
import searchLogo from './searchlogo.png';

function Home() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('keyword');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/search', {
        query,
        searchType,
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
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
        <select className="dropdown" onChange={(e) => setSearchType(e.target.value)} value={searchType}>
          
          <option value="keyword">Keyword</option>
          <option value="semantic">Semantic Search</option>
        </select>
        <select className="dropdown">
           <option value="unigram">Unigram</option>
           <option value="bigram">Bigram</option>
      </select>
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
            <p>Translation: {result.translation}</p>
            <p>Similarity Score: {result.similarityScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
