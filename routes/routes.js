const express = require("express");
const getRouter = express.Router();
const postRouter = express.Router();
postRouter.use(express.json());
const patchRouter = express.Router();
const deleteRouter = express.Router();
const Captions = require("../models/captions.model");

getRouter.get("/get", async (req, res) => {
  res.header({'Access-Control-Allow-Origin': '*'});
  try {
    const captions = await Captions.find();
    res.status(200).json(captions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

getRouter.get('/get/:CaptionID', async (req, res) => {
  res.header({'Access-Control-Allow-Origin': '*'});
  try {
    const { CaptionID } = req.params;
    const caption = await Captions.findOne({ captionID: CaptionID });
    res.status(200).json(caption);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

postRouter.post('/post', async (req, res) => {
  // res.header({'Access-Control-Allow-Origin': '*'});
  try {
    const { captionID, userAvatar, userID, userName, caption, tags } = req.body;
    const newCaption = await Captions.create({
      captionID,
      userAvatar,
      userID,
      userName,
      caption,
      tags
    });
    res.status(201).json(newCaption);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('Validation Error:', err.errors);
      res.status(400).json({ error: 'Validation Error', details: err.errors });
    } else {
      console.error('Error creating caption:', err);
      res.status(500).send("Internal Server Error");
    }
  }
});

patchRouter.patch("/patch/:captionId", async (req, res) => {
  res.header({'Access-Control-Allow-Origin': '*'});
  try {
    const { captionId } = req.params;
    const updates = req.body;

    const caption = await Captions.findOneAndUpdate(
      { captionID: captionId },
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
  res.header({'Access-Control-Allow-Origin': '*'});
  try {
    const { captionId } = req.params;
    const caption = await Captions.findOneAndDelete({ captionID: captionId });

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
