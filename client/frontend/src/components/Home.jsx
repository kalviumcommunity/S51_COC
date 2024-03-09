import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Data from "./Data";
import AuthForm from "./AuthForm";

function Home() {
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const userInfo = parseToken(token);
      setUsername(userInfo.username);
      setUserId(userInfo.userID);
      setIsAuthenticated(true);
    }
  }, []);

  const parseToken = (token) => {
    const decodedToken = atob(token.split(".")[1]);
    return JSON.parse(decodedToken);
  };

  const toggleFormPopup = () => {
    setShowFormPopup(!showFormPopup);
  };

  const closePopup = () => {
    setShowFormPopup(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUsername("");
    setUserId("");
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className="main-stream">
        <div className="left-bar">
          <h1>Collection of Captions</h1>
          <p>
            Collection of Captions is an online platform where users can unleash
            their creativity by writing and sharing captions across various
            themes, moods, and topics. Whether you're crafting witty one-liners,
            expressing heartfelt sentiments, or sharing humorous anecdotes, this
            platform provides a dynamic space for users to explore, create, and
            engage with captivating content.
          </p>
          <div className="add-yours-caption-btn">
            <button onClick={toggleFormPopup}>Add your Caption</button>
          </div>
          {!isAuthenticated && (
            <AuthForm setIsAuthenticated={setIsAuthenticated} />
          )}
          {isAuthenticated && (
            <div className="user-info">
              <h5>
                Welcome, {username} (Public User ID: {userId})
              </h5>
              <div className="logout-button-area">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          )}
        </div>
        <div className="right-bar">
          <h1>Random Captions</h1>
        </div>
      </div>
      {showFormPopup && (
        <div className="form-popup">
          <Data close={closePopup} />
        </div>
      )}
    </>
  );
}

export default Home;
