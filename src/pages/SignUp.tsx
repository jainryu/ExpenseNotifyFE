import { useState } from 'react';
import './Auth.scss';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);



  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        user_id: username,
        password: password,
      });

      setIsError(false)
      setMessage('Signup successful! You can now log in.');
      setUsername('');
      setPassword('');
    } catch (error: any) {
      setIsError(true);
      if (error.response?.data?.detail === 'User already exists') {
        setMessage('User already exists. Please choose another username.');
      } else {
        setMessage('Signup failed. Please try again.');
      }
    }
  };


  return (
    <div>
      <h1 className="welcome-header">
        Welcome to <span>ExpenseNotify</span>
      </h1>
      <div className="auth-wrapper">
        <h2 className="auth-title">Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <input type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="auth-button">Create Account</button>
        </form>
        {message && (
          <p className={`auth-message ${isError ? 'error' : 'success'}`}>{message}</p>
        )}
        <p className="auth-footer">Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
};

export default Signup;