const express = require("express");
const getRouter = express.Router();
const postRouter = express.Router();
const patchRouter = express.Router();
const deleteRouter = express.Router();
const Captions = require("../models/captions.model");

getRouter.get("/get", async (req, res) => {
  try {
    const captions = await Captions.find();
    res.status(200).json(captions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

getRouter.get('/get/:CaptionID', async (req, res) => {
  try {
    const { CaptionID } = req.params;
    const caption = await Captions.findOne({ CaptionID: CaptionID });
    res.status(200).json(caption);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

postRouter.post('/post', async (req, res) => {
  try {
    const { CaptionID, UserAvatar, UserID, UserName, Caption, Tags } = req.body;
    const newCaption = await Captions.create({
      CaptionID,
      UserAvatar,
      UserID,
      UserName,
      Caption,
      Tags
    });
    res.status(201).json(newCaption);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

patchRouter.patch("/patch/:captionId", async (req, res) => {
  try {
    const { captionId } = req.params;
    const updates = req.body;

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

deleteRouter.delete("/delete/:captionId", async (req, res) => {
  try {
    const { captionId } = req.params;
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
