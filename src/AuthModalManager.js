import React, { useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

function AuthModalManager() {
    const [isLoginVisible, setIsLoginVisible] = useState(true); // Controls visibility of Login/Signup

    const showLogin = () => setIsLoginVisible(true);
    const showSignup = () => setIsLoginVisible(false);
    const handleClose = () => setIsLoginVisible(true); // Resets to login or closes both

    return (
        <>
            {isLoginVisible ? (
                <LoginModal onClose={handleClose} onSignup={showSignup} />
            ) : (
                <SignupModal onClose={handleClose} onLogin={showLogin} />
            )}
        </>
    );
}

export default AuthModalManager;
