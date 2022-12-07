const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date },
});

// Virtual for formatted date of death datetime with LUXON library
MessageSchema.virtual("timestamp_formatted").get(function () {
  return DateTime.fromJSDate(this.timestamp).toFormat("yyyy-MM-dd ttt");
});

module.exports = mongoose.model("Message", MessageSchema);
