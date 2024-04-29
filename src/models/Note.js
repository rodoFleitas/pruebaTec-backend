const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Note", noteSchema);
