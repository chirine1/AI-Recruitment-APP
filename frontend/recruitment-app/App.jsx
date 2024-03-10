import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Handle change for registration and login forms
  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === 'register') {
      setUser({ ...user, [name]: value });
    } else if (type === 'login') {
      setLoginInfo({ ...loginInfo, [name]: value });
    }
  };

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/docs/users', user);
      alert('Registration successful!');
      console.log(response.data);
    } catch (error) {
      console.error('Registration error:', error.response);
      alert('Registration failed.');
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/docs/auth/login', loginInfo);
      localStorage.setItem('token', response.data.access_token);
      setIsLoggedIn(true);
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error.response);
      alert('Login failed.');
    }
  };

  // Fetch user details
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token && isLoggedIn) {
        try {
          const response = await axios.get('http://127.0.0.1:8000/docs/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(response.data);
        } catch (error) {
          console.error('Fetch user data error:', error.response);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Name" onChange={(e) => handleChange(e, 'register')} />
        <input type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e, 'register')} />
        <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e, 'register')} />
        <button type="submit">Register</button>
      </form>

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e, 'login')} />
        <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e, 'login')} />
        <button type="submit">Login</button>
      </form>

      {isLoggedIn && userData ? (
        <div>
          <h3>User Info</h3>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
