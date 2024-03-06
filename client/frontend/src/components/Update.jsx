import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Update({ captionId, close }) {
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});
  const [captionData, setCaptionData] = useState({});

  useEffect(() => {
    const fetchCaptionDetails = async () => {
      try {
        const response = await axios.get(
          `https://coc-y497.onrender.com/api/get/${captionId}`
        );
        const fetchedCaptionData = response.data;

        setCaptionData(fetchedCaptionData);
        setUserAvatar(fetchedCaptionData.userAvatar);
        setUserName(fetchedCaptionData.userName);
        setCaption(fetchedCaptionData.caption);
        setTags(fetchedCaptionData.tags);

        const storedUserId = Cookies.get("userId");
        if (storedUserId != fetchedCaptionData.userID) {
          toast.error("You are not authorized to edit this caption");
        }
      } catch (error) {
        console.error("Error fetching caption details:", error);
      }
    };

    fetchCaptionDetails();

    const storedUserName = Cookies.get("username");
    setUserName(storedUserName);
  }, [captionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await axios.patch(
        `https://coc-y497.onrender.com/api/patch/${captionId}`,
        {
          userAvatar: userAvatar,
          userName: userName,
          caption: caption,
          tags: tags,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Caption updated successfully");
      } else {
        toast.error("Failed to update caption");
      }
    } catch (error) {
      console.error("Error updating caption:", error);
      toast.error("Failed to update caption");
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
        <h1>Update Caption</h1>
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
        <div className="user-name">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            name="userName"
            type="text"
            value={userName}
            disabled={Cookies.get("userId") !== captionData.userID}
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
            <button onClick={close}>Close</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Update;
