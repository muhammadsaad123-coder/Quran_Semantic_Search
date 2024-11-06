import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Modal.css';
import searchLogo from '../Assets/searchlogo.png';
import google from '../Assets/google.jpg';
import facebookLogo from '../Assets/fb.jpg';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! ');
        navigate('/Home');
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
        <Link to="/Login" className="close-button">&times;</Link>
        <img src={searchLogo} alt="Logo" className="modal-logo"/>
        <h1 className='logintext'>SignUp</h1>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            className="modal-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm your password"
            required
            className="modal-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="modal-button">Sign Up</button>
        </form>
        
        <p>Already have an account? <Link to="/login" className="link-button">Login</Link></p>

        <p>— or —</p>
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

export default SignupPage;
