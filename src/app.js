require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/history', historyRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Eyesight API!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
