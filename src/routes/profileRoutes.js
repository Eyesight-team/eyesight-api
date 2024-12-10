const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { completeProfile, getProfile } = require('../controllers/profileController');

const router = express.Router();

router.get('/', verifyToken, getProfile);
router.post('/form', verifyToken, completeProfile);

module.exports = router;
