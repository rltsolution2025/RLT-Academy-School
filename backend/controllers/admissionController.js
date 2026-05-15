const Admission = require('../models/Admission');

// ======================================================
// CREATE ADMISSION
// ======================================================

const createAdmission = async (req, res) => {
  try {
    const {
      studentName,
      class: studentClass,
      dob,
      gender,
      parentName,
      phone,
      email,
      address,
    } = req.body;

    // =========================================
    // VALIDATION
    // =========================================

    if (!studentName || !studentClass || !dob || !gender || !parentName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    // PHONE VALIDATION

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid 10-digit phone number',
      });
    }

    // EMAIL VALIDATION

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please enter valid email address',
        });
      }
    }

    // =========================================
    // CREATE ADMISSION
    // =========================================

    const admission = await Admission.create({
      studentName,

      class: studentClass,

      dob,

      gender,

      parentName,

      phone,

      email,

      address,
    });

    // =========================================
    // RESPONSE
    // =========================================

    return res.status(201).json({
      success: true,
      message: 'Admission submitted successfully',
      data: admission,
    });
  } catch (error) {
    console.error('ADMISSION ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET ADMISSIONS
// ======================================================

const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions,
    });
  } catch (error) {
    console.error('GET ADMISSION ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAdmission,
  getAdmissions,
};
