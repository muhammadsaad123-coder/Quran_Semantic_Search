import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Modal.css';
import searchLogo from './searchlogo.png';
import google from './google.jpg';
import facebookLogo from './fb.jpg';


function SignupPage() {
  return (
    <div className="modal">
      <div className="modal-content">
      <Link to="/home" className="close-button">&times;</Link>
        <img src={searchLogo} alt="Logo" className="modal-logo"/>
        <h1 className='logintext'>SignUp</h1>
        <form onSubmit={event => {
          event.preventDefault();
          console.log('Login submitted');
        }}>
          <input type="text" placeholder="Enter your full name" required className="modal-input"/>
          <input type="email" placeholder="Enter your email" required className="modal-input"/>
          <input type="password" placeholder="Enter your password" required className="modal-input"/>
          <input type="password" placeholder="Confirm your password" required className="modal-input"/>
          <button type="submit" className="modal-button">Sign Up</button>
        </form>
        
        <p>Don't have an account? <Link to="/login" className="link-button">Login</Link></p>

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
