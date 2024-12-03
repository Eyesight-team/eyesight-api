const express = require('express');
const { completeProfile } = require('../controllers/profileController');

const router = express.Router();

router.post('/complete', completeProfile);

module.exports = router;
