import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthForm({ setIsAuthenticated }) {
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        userID,
        username,
      });

      if (response.status === 200 && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 24 });
        toast.success("Login successful!");
        setIsAuthenticated(true)
      } else {
        toast.error("An error occurred while logging in");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred while logging in");
      }
    }

  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="userID-generate">
          <label htmlFor="userID">User ID:</label>
          <input
            type="number"
            value={userID}
            name="userID"
            id="userID"
            placeholder="userID"
            onChange={(event) => setUserID(event.target.value)}
          />
        </div>
        <div className="username-area">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="submit-btns">
          <div className="submit-btn">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
