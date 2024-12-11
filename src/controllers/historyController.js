// Dummy
const dummy = [
  { id: '#R181246', name: 'Apel', testScore: 80, confidence: 75, status: 'Lulus', timestamp: '19-10-2024, 16:50 WIB' },
  { id: '#R181245', name: 'Apel', testScore: 85, confidence: 90, status: 'Lulus', timestamp: '19-10-2024, 16:40 WIB' },
  { id: '#R181244', name: 'Apel', testScore: 72, confidence: 81, status: 'Lulus', timestamp: '19-10-2024, 16:30 WIB' },
  { id: '#R181243', name: 'Apel', testScore: 25, confidence: 75, status: 'Gagal', timestamp: '19-10-2024, 16:20 WIB' },
  { id: '#R181242', name: 'Apel', testScore: 84, confidence: 90, status: 'Lulus', timestamp: '19-10-2024, 16:10 WIB' },
];

// const firestore = require('../config/firestore');

const getHistory = async (req, res) => {
  try {
    // Using dummy data for testing
    const totalProducts = dummy.length;
    const passedProducts = dummy.filter(item => item.status === 'Lulus').length;
    const failedProducts = dummy.filter(item => item.status === 'Gagal').length;

    const summary = {
      totalProducts,
      passedProducts,
      failedProducts,
    };

    /*
    const historySnapshot = await firestore.collection('history').orderBy('timestamp', 'desc').get();
    const history = [];
    historySnapshot.forEach((doc) => {
      const data = doc.data();
      history.push({
        id: data.id,
        name: data.name,
        testScore: data.testScore,
        confidence: data.confidence,
        status: data.status,
        timestamp: data.timestamp, 
      });
    });
    */

    res.status(200).json({
      message: 'History fetched successfully',
      summary,
      history: dummy, //history
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({
      message: 'Failed to fetch history',
      error: error.message,
    });
  }
};

module.exports = { getHistory };
