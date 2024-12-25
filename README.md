 Quran Semantic Search Engine
The Quran Semantic Search Engine is a web-based application designed to make exploring the Quran easier and more meaningful. This project allows users to search Quranic text using three approaches: single-word search, word-pair search, and contextual semantic search. Built with modern web technologies and advanced Natural Language Processing (NLP) techniques, the system delivers accurate and contextually relevant results.

Features
1. Search Capabilities:  
   - Single-Word Search: Highlights the specific word in relevant verses.  
   - Word-Pair Search: Highlights pairs of words (bigram) in the Quran.  
   - Semantic Search: Displays contextually similar verses using Word2Vec and WordNet for query expansion.  

2. Audio Playback:  
   - Reads Quranic translations aloud using the SpeechSynthesis API.  
   - Highlights words dynamically during playback for better understanding.  

3. User Management:  
   - Signup, login, or guest access options.  
   - Stores user data in MongoDB for authentication.  

4. Responsive Frontend:  
   - Built with React.js, providing a smooth user experience.  

5. Backend Integration:  
   - Node.js and Express.js for handling API requests.  
   - Python scripts for NLP tasks like unigram, bigram, and semantic searches.  

6. Database:  
   - MongoDB for user authentication.  
   - Quran dataset stored in an Excel file for processing.  

 Technologies Used
 
- Frontend: React.js  
- Backend: Node.js, Express.js  
- NLP: Python (TF-IDF, Word2Vec, WordNet, Cosine Similarity)  
- Database: MongoDB, Excel (Quran dataset)  
- Deployment: Vercel (Frontend)  



 How to Install and Run the Project

 Prerequisites
1. Install Node.js: [Download Node.js](https://nodejs.org/)  
2. Install Python: [Download Python](https://www.python.org/)  
   - Ensure `pip` (Python package manager) is installed.  
3. Install MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)  
   - Start the MongoDB server locally or use an online MongoDB cluster.

 Steps to Run the Project Locally
1. Clone the Repository  
   ```bash
   git clone https://github.com/your-username/quran-semantic-search.git
   cd quran-semantic-search
   ```

2. Setup the Backend
   - Navigate to the backend folder:  
     ```bash
     cd backend
     ```
   - Install Python dependencies:  
     ```bash
     pip install -r requirements.txt
     ```
   - Start the backend server:  
     ```bash
     python server.py
     ```

3. Setup the Frontend
   - Navigate to the frontend folder:  
     ```bash
     cd frontend
     ```
   - Install Node.js dependencies:  
     ```bash
     npm install
     ```
   - Start the React app:  
     ```bash
     npm start
     ```

4. Setup MongoDB  
   - Start your MongoDB server locally or configure your connection string in the backend.

5. Access the Application  
   - Open your browser and go to `http://localhost:3000`.  

---

 How to Use
1. Sign Up or Login:  
   Create an account or use guest access to start exploring.  

2. Perform Searches:  
   - Enter a single word (e.g., "charity") for unigram search.  
   - Enter a pair of words (e.g., "right path") for bigram search.  
   - Enter a contextual query (e.g., "Allah’s forgiveness") for semantic search.  

3. View Results:  
   - Highlighted search terms and contextually relevant verses are displayed.  

4. Audio Playback:  
   - Click the play button to hear translations with word-by-word highlighting.  

 Deployment
The frontend of the project is deployed on Vercel and can be accessed online.  

---

 Contributing
Contributions are welcome!  
1. Fork the repository.  
2. Create a new branch for your feature:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add new feature"
   ```  
4. Push to your branch:  
   ```bash
   git push origin feature-name
   ```  
5. Open a pull request.  

---

 Contact
For queries or collaboration, feel free to contact:  
- Muhammad Saad: Lead Developer
- LinkedIn: https://www.linkedin.com/in/muhammadsaad023/
  0322-5425081

