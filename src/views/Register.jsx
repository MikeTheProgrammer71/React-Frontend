import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/userService";
import { useAuth } from "../states/auth";
import styles from "../styles/views/Register.module.css";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const authStore = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, username, password };
      const response = await UserService.addUser(userData);

      if (response) {
        const result = await UserService.authenticateUser({ username, password });
        
        if (result) {
          const { user, token } = result;
        
          authStore.logout();
          authStore.login(user, token);
          navigate("/Home");  
        } else {
          setErrorMessage("Failed to log in after registration");
        }
      } else {
        setErrorMessage("Registration failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during registration");
    }
  };

  return (
    <div className={styles["register-container"]}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className={styles["input-group"]}>
          <label className={styles["field-label"]} htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className={styles["name-textfield"]}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles["input-group"]}>
          <label className={styles["field-label"]} htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className={styles["username-textfield"]}
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
            className={styles["password-textfield"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className={styles["register-button"]} type="submit">Register</button>
      </form>
      <p>
        <a href="/" className={styles["sign-in-link"]}>Already Have an Account? Sign In</a>
      </p>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Register;
