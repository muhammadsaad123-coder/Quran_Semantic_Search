import React, { useState } from 'react';
import '../Styles/About.css'; // Importing CSS for styling
import { Link } from 'react-router-dom';

const About = () => {
  const [copyMessage, setCopyMessage] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);

    // Set the message and display it
    setCopyMessage(`Copied to clipboard: ${text}`);

    // Hide the message after 5 seconds (increased time)
    setTimeout(() => {
      setCopyMessage('');
    }, 15000);  // Increased the timeout to 5 seconds
  };

  return (
    <div className="about-container">
      <Link to="/home" className="close-button">&times;</Link>
      <h1>About Our Search Functionalities</h1>

      {/* Display the copied message */}
      {copyMessage && (
        <div className="copy-message">
          {copyMessage}
        </div>
      )}

      {/* Section: Keyword Search by Single Word */}
      <div className="section">
        <h2>Keyword Search by Single Word</h2>
        <p>
          This search functionality focuses on retrieving verses containing an exact single word.
          It scans the Quranic text to match the word provided in the query, ensuring results
          directly correspond to the specified term without considering its broader context.
        </p>
        <p><strong>Example Query:</strong> <em>Merciful</em></p>
        <p><strong>Output:</strong> Surah Al-Baqarah, Verse 143: "Indeed, Allah is to the people Kind and Merciful."</p>
        <p><strong>Queries:</strong></p>
        <ul>
          {['God', 'Merciful', 'Religion', 'Paradise', 'World', 'Patience', 'Righteousness', 'Knowledge', 'Soul', 'Prayer', 'Worship', 'Truth', 'Justice'].map((query, index) => (
            <li key={index}>
              {query}
              <button
                className="copy-button"
                onClick={() => copyToClipboard(query)}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Section: Keyword Search by Word Pair */}
      <div className="section">
        <h2>Keyword Search by Word Pair</h2>
        <p>
          This feature identifies meaningful combinations of two words (bigrams) in the Quranic text.
          It ensures that both words in the pair contribute to the search results, capturing verses
          that reflect their combined significance.
        </p>
        <p><strong>Example Query:</strong> <em>Day of Judgment</em></p>
        <p><strong>Output:</strong> Surah Al-Fatihah, Verse 4: "Master of the Day of Judgment."</p>
        <p><strong>Queries:</strong></p>
        <ul>
          {[ 
            'Day of Judgment',
            'Righteous deeds',
            'Justice of God',
            'Day of Resurrection',
            'Mercy of God',
            'Justice and Truth',
            'Day of Reckoning',
            'Good deeds rewarded',
            'Eternal life',
            'Good Deeds',
            'Right path',
            'Signs of Allah',
            'Life and Death',
            'Charity and Justice',
          ].map((query, index) => (
            <li key={index}>
              {query}
              <button
                className="copy-button"
                onClick={() => copyToClipboard(query)}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Section: Contextual Search */}
      <div className="section">
        <h2>Contextual Search</h2>
        <p>
          Contextual search analyzes the deeper meanings and relationships between words to provide
          results that align with the query's intent. This feature utilizes semantic understanding to
          retrieve verses where the underlying theme matches the user's search.
        </p>
        <p><strong>Example Query:</strong> <em>Verses related to the mercy of God</em></p>
        <p><strong>Output:</strong> Surah Az-Zumar, Verse 53: "Say, 'O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.'"</p>
        <p><strong>Queries:</strong></p>
        <ul>
          {[
            'Verses related to the mercy of God',
            'Guidance for the believers',
            'The creation of the universe according to the Quran',
            'Attributes of God in the Quran',
            'Importance of prayer',
            'Rewards for doing good deeds',
            'Forgiveness and repentance',
            'Verses describing Paradise',
            'Teachings about justice',
            'The role of prophets in Islam',
            'Commandments related to charity',
          ].map((query, index) => (
            <li key={index}>
              {query}
              <button
                className="copy-button"
                onClick={() => copyToClipboard(query)}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
