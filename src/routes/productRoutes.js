const express = require('express');
const multer = require('multer');
const { createProduct, getProducts } = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', verifyToken, upload.single('image'), createProduct);

router.get('/', verifyToken, getProducts);

module.exports = router;
