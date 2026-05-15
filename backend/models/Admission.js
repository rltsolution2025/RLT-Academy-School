const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    parentName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('Admission', admissionSchema);
