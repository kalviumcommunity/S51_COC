import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Copy from "../assets/copy.png";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";

function Captions() {
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [captionId, setCaptionId] = useState(null);

  const handleDelete = async (captionId, userId) => {
    try {
      const storedUserId = Cookies.get("userId");
      if (storedUserId == userId) {
        const response = await axios.delete(
          `https://coc-y497.onrender.com/api/delete/${captionId}`
        );
        if (response.status === 200) {
          toast.success("Caption deleted successfully");
          fetchData();
        } else {
          toast.error("Failed to delete caption");
        }
      } else {
        toast.warning("You are not authorized to delete this caption");
      }
    } catch (error) {
      console.error("Error deleting caption:", error);
      toast.error("Failed to delete caption");
    }
  };

  const toggleFormPopup = (captionId) => {
    setCaptionId(captionId);
    setShowFormPopup(!showFormPopup);
  };

  const closePopup = () => {
    setShowFormPopup(false);
  };

  const [captions, setCaptions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://coc-y497.onrender.com/api/get");
      setCaptions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className="captions-area-heading">Captions</h1>
      <div className="captions-list-area">
        <div className="single-caption-area">
          {captions.map((caption, index) => (
            <div className="caption-items-list" key={index}>
              <div className="top-area">
                <div className="user-area-list">
                  <div className="user-dp-area">
                    <img src={caption.userAvatar} alt="user-profile-picture" />
                  </div>
                  <div className="user-details-area">
                    <h5>{caption.userName}</h5>
                    <p>Public User ID: {caption.userID}</p>
                  </div>
                </div>
                <div className="caption-tag-list-area">
                  <p>#{caption.tags}</p>
                </div>
              </div>
              <div className="bottom-area">
                <div className="caption-text-here-area">
                  <h4>"{caption.caption}"</h4>
                </div>
                <div className="copy-me-icon">
                  <img src={Copy} alt="copy-icon" />
                  <p>Copy</p>
                </div>
              </div>
              <div className="buttons-list-area">
                <div
                  className="edit-btn-area"
                  onClick={() => toggleFormPopup(caption.captionID)}
                >
                  <img src={Edit} alt="" />
                  <p>Edit</p>
                </div>
                <div
                  className="delete-btn-area"
                  onClick={() =>
                    handleDelete(caption.captionID, caption.userID)
                  }
                >
                  <img src={Delete} alt="" />
                  <p>Delete</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showFormPopup && (
        <div className="form-popup">
          <Update captionId={captionId} close={closePopup} />
        </div>
      )}
    </>
  );
}

export default Captions;
