import express from "express";

import Member from "../../models/Member";

import verifyToken from "../../middleware/verifyToken";

const router = express.Router();

// Authentication middleware for all roads
router.use(verifyToken);

// GET all members
router.get("/", async (req, res) => {
  try {
    const result = await Member.find({});
    res.json({ result, token: req.token });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Error occur",
      error: err.message
    });
  }
});

// GET single member
router.get("/:id", async (req, res) => {
  try {
    const result = await Member.findById({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Error occur",
      error: err.message
    });
  }
});

// POST new user
router.post("/", async (req, res) => {
  try {
    const result = await Member.create(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Error occur",
      error: err.message
    });
  }
});

// PUT existing user
router.put("/:id", async (req, res) => {
  try {
    const result = await Member.updateOne({ _id: req.params.id }, req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Error occur",
      error: err.message
    });
  }
});

// DELETE member
router.delete("/:id", async (req, res) => {
  try {
    const result = await Member.remove({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "Error occur",
      error: err.message
    });
  }
});

module.exports = router;
