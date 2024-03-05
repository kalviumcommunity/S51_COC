import React, { useState } from "react";
import Data from "./Data";

function Home() {
  const [showFormPopup, setShowFormPopup] = useState(false);

  const toggleFormPopup = () => {
    setShowFormPopup(!showFormPopup);
  };

  const closePopup = () => {
    setShowFormPopup(false);
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
        </div>
        <div className="right-bar">
          <h1>Random Captions</h1>
          
        </div>
      </div>
      {showFormPopup && (
          <div className="form-popup">
            <Data close={closePopup}/>
          </div>
        )}
    </>
  );
}

export default Home;
