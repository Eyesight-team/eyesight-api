const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

module.exports = firestore;
