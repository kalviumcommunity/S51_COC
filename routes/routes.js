const express = require("express");
const app = express();
const getRouter = express.Router();
const postRouter = express.Router();
postRouter.use(express.json());
const patchRouter = express.Router();
const deleteRouter = express.Router();
const Captions = require("../models/captions.model");
const postValidator = require("../validators/postValidator");
const updateValidator = require("../validators/updateValidator");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

getRouter.get("/get", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const captions = await Captions.find();
    res.status(200).json(captions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

getRouter.get("/get/:CaptionID", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const { CaptionID } = req.params;
    const caption = await Captions.findOne({ captionID: CaptionID });
    res.status(200).json(caption);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

postRouter.post("/post", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const { captionID, userAvatar, userID, userName, caption, tags } = req.body;

    const validationResult = postValidator({
      captionID,
      userAvatar,
      userID,
      userName,
      caption,
      tags,
    });

    if (validationResult.error) {
      const errors = validationResult.error.details.map(
        (detail) => detail.message
      );
      console.error("Validation Error:", errors);
      return res
        .status(400)
        .json({ error: "Validation Error", details: errors });
    }

    const newCaption = await Captions.create({
      captionID,
      userAvatar,
      userID,
      userName,
      caption,
      tags,
    });
    res.status(201).json(newCaption);
  } catch (err) {
    console.error("Error creating caption:", err);
    res.status(500).send("Internal Server Error");
  }
});

patchRouter.patch("/patch/:captionId", async (req, res) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  try {
    const { captionId } = req.params;
    const updates = req.body;

    const validationResult = updateValidator(updates);

    if (validationResult.error) {
      const errors = validationResult.error.details.map(
        (detail) => detail.message
      );
      console.error("Validation Error:", errors);
      return res
        .status(400)
        .json({ error: "Validation Error", details: errors });
    }

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
  res.header({ "Access-Control-Allow-Origin": "*" });
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
