import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Modal.css';
import searchLogo from '../Assets/searchlogo.png';
import google from '../Assets/google.jpg';
import facebookLogo from '../Assets/fb.jpg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <img src={searchLogo} alt="Logo" className="modal-logo"/>
        <h1 className='logintext'>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="modal-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            required
            className="modal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="modal-button">Login</button>
        </form>
        
        <p>Don't have an account? <Link to="/signup" className="link-button">Signup</Link></p>

        <p>— or —</p>

        <Link to="/home" className="modal-button guest-button">Continue as Guest</Link>
       
        <button className="modal-button social-button">
          <img src={facebookLogo} alt="Facebook logo" className="social-logo" />
          Login with Facebook
        </button>
        <button className="modal-button social-button">
          <img src={google} alt="Google logo" className="social-logo" />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
