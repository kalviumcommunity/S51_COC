import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function AuthForm(props) {

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const generatedUserId = generateRandomNumber();
    setUserId(generatedUserId);
  }, []);

  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 100000);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    Cookies.set("userId", userId);
    Cookies.set("username", username);

    setUsername("");

    props.close();

    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div className="userID-generate">
          <label htmlFor="userID">User ID:</label>
          <input
            type="number"
            value={userId}
            name="userID"
            id="userID"
            disabled
          />
        </div>
        <div className="username-area">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="submit-btns">
          <div className="submit-btn">
            <button type="submit">Register</button>
          </div>
          <div className="close-btn">
            <button type="submit" onClick={props.close}>Close</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
