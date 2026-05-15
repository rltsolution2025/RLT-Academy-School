const express = require('express');

const router = express.Router();

const {
    createContact, getContacts
} = require('../controllers/contactController');

router.post('/', createContact);

// GET ALL CONTACTS
router.get('/', getContacts);
module.exports = router;