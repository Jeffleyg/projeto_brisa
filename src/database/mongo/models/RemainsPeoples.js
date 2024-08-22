const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RemainsPeoplesSchema = new Schema({
  id: Number,
  name: String,
  zip: String,
  state: String,
  segment: String,
  city: String,
  neighborhood: String,
  street: String,
  complement: String,
  number: String,
  company: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0], // Devido ao 2dsphere index, é necessário colocar [longitude, latitude]
    },
  },
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  id: false,
  versionKey: false,
});

RemainsPeoplesSchema.index({ id: 1 }, { unique: true });
RemainsPeoplesSchema.index({ name: "text" }, { default_language: "pt-br" });

module.exports = mongoose.model("RemainsPeoples", RemainsPeoplesSchema);
