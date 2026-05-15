const Contact = require('../models/Contact');

// ======================================================
// CREATE CONTACT
// ======================================================

const createContact = async (req, res) => {
  try {
    const { name, email, phone, grade, message } = req.body;

    // =========================================
    // VALIDATION
    // =========================================

    if (!name || !email || !phone || !grade || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all required fields',
      });
    }

    // EMAIL VALIDATION

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid email address',
      });
    }

    // PHONE VALIDATION

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter valid 10-digit phone number',
      });
    }

    // =========================================
    // CREATE CONTACT
    // =========================================

    const contact = await Contact.create({
      name,
      email,
      phone,
      grade,
      message,
    });

    // =========================================
    // RESPONSE
    // =========================================

    return res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error) {
    console.error('CONTACT ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// GET CONTACTS
// ======================================================

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('GET CONTACT ERROR:', error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
};
