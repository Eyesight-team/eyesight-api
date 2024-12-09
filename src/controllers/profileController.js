const firestore = require('../data/db');

const completeProfile = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    phone,
    companyName,
    companyAddress,
    jobDesc,
    hasDevice, 
    product, 
  } = req.body;

  try {
    const userRef = firestore.collection('users').doc(req.user.id); // Use JWT's user ID
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await userRef.update({
      firstName,
      lastName,
      dob,
      phone,
      companyName,
      companyAddress,
      jobDesc,
      hasDevice,
      product,
      isProfileComplete: true,
    });

    res.status(200).json({ message: 'Profile completed successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error completing profile.', error: err.message });
  }
};

module.exports = { completeProfile };
