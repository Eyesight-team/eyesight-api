const { Storage } = require('@google-cloud/storage');
const firestore = require('../config/firestore');
const { v4: uuidv4 } = require('uuid');

const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME); 

const createProduct = async (req, res) => {
  try {
    const { title, description, marketplaceLink } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const fileName = `${uuidv4()}-${req.file.originalname}`;
    const file = bucket.file(fileName);

    await file.save(req.file.buffer, {
      contentType: req.file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    });

    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    const productRef = firestore.collection('products').doc();
    await productRef.set({
      title,
      description,
      imageUrl,
      marketplaceLink,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({ message: 'Product created successfully', id: productRef.id });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const snapshot = await firestore.collection('products').orderBy('createdAt', 'desc').get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};


module.exports = { createProduct, getProducts };