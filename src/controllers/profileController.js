const firestore = require('../data/db');

const completeProfile = async (req, res) => {
  const { userId, firstName, lastName, dob, phone, companyName, companyAddress } = req.body;

  try {
    const userRef = firestore.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }

    await userRef.update({
      firstName,
      lastName,
      dob,
      phone,
      companyName,
      companyAddress,
      isProfileComplete: true,
    });

    res.status(200).json({ message: 'Profile berhasil dilengkapi.' });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan.', error: err.message });
  }
};

module.exports = {
  completeProfile,
};
