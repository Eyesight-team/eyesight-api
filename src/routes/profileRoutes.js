const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { completeProfile } = require('../controllers/profileController');

const router = express.Router();

router.post('/complete', verifyToken, completeProfile);

module.exports = router;
