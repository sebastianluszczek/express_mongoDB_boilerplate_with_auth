import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    active: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Member", memberSchema);
