const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getHistory } = require('../controllers/historyController');

const router = express.Router();

router.get('/', verifyToken, getHistory);

module.exports = router;
