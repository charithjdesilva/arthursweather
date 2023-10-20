import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Create a LoginError component
const LoginError = ({ errorMessage }) => {
  return (
    <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  );
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is logged in. Navigate to the home page.
      navigate('/home');
    } catch (error) {
      setLoginError(error.message); // Set the login error message
      console.error(error.message);
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col">
          <h1>Mickey Arthur's Weather App</h1>
          <img
            src="/Micky.jpg"
            alt="Weather App Logo"
            className="rounded-circle border border-4 border-dark-subtle"
            width="150vh"
            height="150vh"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mt-3"
            size={50}
            />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mt-3"
            size={50}
            />
          <div className="d-grid gap-2">
            <button onClick={handleLogin} className="btn btn-primary btn-block my-3">
              Login
            </button>
          </div>
            {loginError && <LoginError errorMessage={loginError} />}
        </div>
      </div>
    </div>
  );
}
