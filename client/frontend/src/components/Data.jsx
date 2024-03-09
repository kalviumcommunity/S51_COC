import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Data(props) {
  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 100000);
  };

  const [captionID] = useState(generateRandomNumber());
  const [userID, setUserID] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const userInfo = parseToken(token);
      setUserName(userInfo.username);
      setUserID(userInfo.userID);
    }
  }, []);

  const parseToken = (token) => {
    const decodedToken = atob(token.split(".")[1]);
    return JSON.parse(decodedToken);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!userAvatar) {
      validationErrors.userAvatar = "User Avatar URL is required";
    }
    if (!caption) {
      validationErrors.caption = "Caption is required";
    }
    if (!tags) {
      validationErrors.tags = "Tag is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "https://coc-y497.onrender.com/api/post",
        {
          captionID,
          userAvatar,
          userID,
          userName,
          caption,
          tags,
        }
      );

      if (response.status === 201) {
        setUserAvatar("");
        setCaption("");
        setTags("");
        toast.success("Data submitted successfully!");
      } else {
        toast.error("Failed to submit data! Please try again later");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Failed to submit data. Please try again later.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "userAvatar") setUserAvatar(value);
    else if (name === "caption") setCaption(value);
    else if (name === "tags") setTags(value);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h1>Add your Caption</h1>
        <div className="caption-id">
          <label htmlFor="captionid">Public Caption ID:</label>
          <input id="captionid" value={captionID} type="number" disabled />
        </div>
        <div className="user-avatar">
          <label htmlFor="useravatar">User Avatar URL:</label>
          <input
            id="useravatar"
            type="text"
            name="userAvatar"
            placeholder="https://example.com/image.jpg"
            value={userAvatar}
            onChange={handleChange}
          />
          {errors.userAvatar && (
            <div className="error">{errors.userAvatar}</div>
          )}
        </div>
        <div className="user-id">
          <label htmlFor="userid">Public User ID:</label>
          <input id="userid" type="number" value={userID} disabled />
        </div>
        <div className="user-name">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="userName"
            type="text"
            value={userName}
            disabled
          />
          {errors.userName && <div className="error">{errors.userName}</div>}
        </div>
        <div className="caption-here">
          <label htmlFor="caption">Caption Here:</label>
          <input
            type="text"
            name="caption"
            id="caption"
            rows="4"
            value={caption}
            onChange={handleChange}
          />
          {errors.caption && <div className="error">{errors.caption}</div>}
        </div>
        <div className="tags">
          <label htmlFor="tags">Select one Tag:</label>
          <select name="tags" id="tags" value={tags} onChange={handleChange}>
            <option value="">Tag your Caption</option>
            <option value="Life">Life</option>
            <option value="Love">Love</option>
            <option value="Motivation">Motivation</option>
            <option value="Photography">Photography</option>
            <option value="Friends">Friends</option>
          </select>
          {errors.tags && <div className="error">{errors.tags}</div>}
        </div>
        <div className="submit-btns">
          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
          <div className="close-btn">
            <button onClick={props.close}>Close</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Data;
