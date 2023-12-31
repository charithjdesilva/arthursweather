import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setLoginError(error.message);
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div className="col">
          <h1 className='mb-4'>Mickey Arthur's Weather App</h1>
          <img
            src="/Micky.jpg"
            alt="Weather App Logo"
            className="rounded-circle border border-4 border-dark-subtle"
            width="150vh"
            height="150vh"
          />
          <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-primary btn-block my-3">
                Login
              </button>
            </div>
          </form>
          {loginError && <LoginError errorMessage={loginError} />}
        </div>
      </div>
    </div>
  );
}
