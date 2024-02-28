const express = require("express");
const getRouter = express.Router();
const postRouter = express.Router();
const patchRouter = express.Router();
const deleteRouter = express.Router();
const Captions = require("../models/captions.model");

getRouter.get("/get", async (req, res) => {
  try {
    const captions = await Captions.find(); // Fetch all captions from the database
    res.status(200).json(captions); // Respond with the captions in JSON format
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to create a new caption
postRouter.post("/post", async (req, res) => {
  try {
    const { CaptionID, UserAvatar, UserID, UserName, Caption, Tags } = req.body;

    // Create a new caption object
    const caption = new Captions({
      CaptionID,
      UserAvatar,
      UserID,
      UserName,
      Caption,
      Tags,
    });
    await caption.save();
    console.log(req.body)
    res.status(201).json({ message: "Caption added successfully", caption });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update an existing caption
patchRouter.patch("/patch/:captionId", async (req, res) => {
  try {
    const { captionId } = req.params; // Extract captionId from request parameters
    const updates = req.body; // Extract updates from request body

    // Find and update the caption by captionId
    const caption = await Captions.findOneAndUpdate(
      { CaptionID: captionId },
      { $set: updates },
      { new: true }
    );

    if (!caption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    res.status(200).json({ message: "Caption updated successfully", caption });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to delete a caption by captionId
deleteRouter.delete("/delete/:captionId", async (req, res) => {
  try {
    const { captionId } = req.params; // Extract captionId from request parameters

    // Find and delete the caption by captionId
    const caption = await Captions.findOneAndDelete({ CaptionID: captionId });

    if (!caption) {
      return res.status(404).json({ message: "Caption not found" });
    }

    res.status(200).json({ message: "Caption deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { getRouter, postRouter, patchRouter, deleteRouter };
