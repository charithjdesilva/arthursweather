import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useHistory } from 'react-router'; // Import useHistory

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Initialize useHistory

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User is logged in. Redirect to the home page.
      history.push('/home');
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='form-control mt-3'
        size={50}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='form-control mt-3'
        size={50}
      />
      <div className="d-grid gap-2">
        <button onClick={handleLogin} className='btn btn-primary btn-block mt-3'>Login</button>
      </div>
    </div>
  )
}
