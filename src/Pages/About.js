// src/components/About.js

import React from 'react';
import '../Styles/About.css'; // Importing CSS for styling
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about-container">

<Link to="/home" className="close-button">&times;</Link>
      <h1>About Our Search Functionalities</h1>

      <div className="section">
        <h2>Keyword Search</h2>
        <p>This feature allows users to search for specific words or phrases within the Quranic text.</p>
        <p><strong>Example:</strong> A search for "mercy" might return Surah Al-An'am, Verse 12: "Indeed, My mercy extends to all things."</p>
        <p>This type of search also supports searching for similar words using cosine similarity, enhancing the relevance of results.</p>

      </div>

      <div className="section">
        <h2>Semantic Search (Considering Context)</h2>
        <p>This search goes beyond simple keyword matching. It understands the context and deeper meaning of words in the Quran, ensuring that the search results are contextually relevant.</p>
        <p><strong>Example:</strong> Searching for "patience" will return verses that discuss patience in trials, such as Surah Al-Baqarah, Verse 153: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient."</p>
        <p>This method uses WordNet and semantic dictionaries to interpret the sense of words, achieving semantic similarity for more accurate word sense disambiguation.</p>
      </div>

      <div className="section">
        <h2>Unigram and Bigram Analysis</h2>
        <p>This feature analyzes the Quranic text at the level of individual words (unigrams) and pairs of words (bigrams) to enhance search accuracy and relevancy.</p>
        <p><strong>Example:</strong> When a user searches for "right path," the system recognizes "right" and "path" as a significant combination (bigram) and may return Surah Al-Fatiha, Verse 6: "Guide us to the straight path." Eg:reject faith ,  allah prayer ,allah truth ,believe allah</p>
        <p>This analytical approach is crucial for understanding and retrieving the precise meanings and teachings of the Quran.</p>
      </div>

      <div className="comparison-container">
      <h1>Understanding Our Search Functionalities</h1>
      <table>
        <thead>
          <tr>
            <th>Functionality</th>
            <th>Description</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Keyword Search</td>
            <td>Searches based on exact matches of words or phrases without considering context.</td>
            <td>Searching "mercy" returns all verses containing the word "mercy".</td>
          </tr>
          <tr>
            <td>Semantic Search</td>
            <td>Considers the context and semantic meanings of words to find contextually relevant verses.</td>
            <td>Searching "guidance" might return verses about divine guidance even without the exact word.</td>
          </tr>
          <tr>
            <td>Unigram and Bigram Analysis</td>
            <td>Focuses on the significance of single words and pairs of words to improve search relevance and specificity.</td>
            <td>Searching "right path" recognizes the importance of both words together, leading to more specific results.</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>

    
  );
};

export default About;
