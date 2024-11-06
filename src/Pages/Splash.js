import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Splash.css';
import searchLogo from '../Assets/searchlogo.png';  // Ensure the path to the image is correct

function Splash() {
  let navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(interval);
          navigate('/Login'); // Redirect when progress reaches 100%
          return 100;
        } else {
          return Math.min(oldProgress + 33, 100); // Increment progress
        }
      });
    }, 1000); // Increment every second
    
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="splash" >
      <img src={searchLogo} alt="Quran Semantic Search Logo" className="logo"/>
      <h1 className="animated-text">Quran Semantic Search</h1>
      <progress value={progress} max="100" className="loading-bar"></progress>
      
      <div className="progress-label">{progress}%</div> {/* Display progress percentage */}
    </div>
  );
}

export default Splash;
