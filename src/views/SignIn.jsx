import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/userService';
import { useAuth } from '../states/auth.jsx';
import styles from "../styles/views/SignIn.module.css";

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userData = { username, password };
      const result = await UserService.authenticateUser(userData);

      if (result) {
        const { user, token } = result;

        logout();
        login(user, token);
        
        if (user.role === "User") {
          navigate('/Home');
        } else if (user.role === "Admin") {
          navigate('/AdminDashboard');
        }
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred during sign-in');
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className={styles["sign-in-container"]}>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className={styles["input-group"]}>
          <label className={styles["field-label"]} htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className={styles["text-field"]}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles["input-group"]}>
          <label className={styles["field-label"]} htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className={styles["password-field"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles["sign-in-button"]} type="submit">Sign In</button>
      </form>
      <a href="/Register" className={styles["register-link"]}>
        Don't Have an Account? Sign up
      </a>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default SignIn;
