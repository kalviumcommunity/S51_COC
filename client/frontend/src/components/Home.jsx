import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Data from "./Data";
import AuthForm from "./AuthForm";

function Home() {
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [showAuthFormPopup, setShowAuthFormPopup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    const storedUserId = Cookies.get("userId");

    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    }
  }, []);

  const toggleFormPopup = () => {
    setShowFormPopup(!showFormPopup);
  };

  const toggleAuthFormPopup = () => {
    setShowAuthFormPopup(!showAuthFormPopup);
  };

  const closePopup = () => {
    setShowFormPopup(false);
  };

  const closeAuthPopup = () => {
    setShowAuthFormPopup(false);
  };

  const handleLogout = () => {
    Cookies.remove("username");
    Cookies.remove("userId");
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
          {isAuthenticated ? (
            <div className="user-info">
              <h5>Welcome, {username} (Public User ID: {userId})</h5>
              <div className="logout-button-area">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div className="home-buttons-area">
              <div className="login-button-area">
                <button onClick={toggleAuthFormPopup}>Login/Sign Up</button>
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

      {showAuthFormPopup && (
        <div className="form-popup">
          <AuthForm close={closeAuthPopup} />
        </div>
      )}
    </>
  );
}

export default Home;
