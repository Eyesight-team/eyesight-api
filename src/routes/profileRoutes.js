const express = require('express');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { completeProfile } = require('../controllers/profileController');

const router = express.Router();

router.post('/complete', isAuthenticated, completeProfile);

module.exports = router;
