const mongoose = require("mongoose");

const { Schema } = mongoose;

const ThemeSchema = new Schema({
 
  email: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  group_dance: {
    type: [String],
    default: "Not participating",
  },
  fashion_show: {
    type: [String],
    default: "Not participating",
  },
  mr_ms: {
    type: [String],
    default: "Not participating",
  },
  tug_of_war: {
    type: [String],
    default: "Not participating",
  },
  surprice_event: {
    type: String,
    default: "Not participating",
  },
  war_of_word: {
    type: String,
    default: "Not participating",
  },
  third_degree: {
    type: String,
    default: "Not participating",
  },
  meme_making: {
    type: String,
    default: "Not participating",
  },
  code_hunt: {
    type: [String],
    default: "Not participating",
  },
  blind_coding: {
    type: [String],
    default: "Not participating",
  },
  photography: {
    type: String,
    default: "Not participating",
  },
  cinematic_creation: {
    type: [String],
    default: "Not participating",
  },
  cs_go: {
    type: [String],
    default: "Not participating",
  },
  nfs: {
    type: String,
    default: "Not participating",
  },
  fifa: {
    type: String,
    default: "Not participating",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("theme", ThemeSchema);
