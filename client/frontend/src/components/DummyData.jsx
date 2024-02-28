import React, { useState, useEffect } from "react";
import "./Dummy.css";

function DummyData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://coc-y497.onrender.com/api/get");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1 className="heading">Collection of Captions COC</h1>
      {data.map((item, index) => (
        <div key={index} className="container">
          <div className="top">
            <div className="user">
              <img src={item.userAvatar} alt="" />
              <div className="user-details">
                <h3>{item.userName}</h3>
                <p>Public Caption ID: {item.captionID}</p>
              </div>
            </div>
            <div className="tags">
              <div className="tag">
                <h4>#{item.tags}</h4>
              </div>
            </div>
          </div>
          <div className="caption">
            <p>{item.caption}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default DummyData;
