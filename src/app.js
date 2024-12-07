require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { initializePassport } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initializePassport(app);

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Eyesight!');
});

app.use((req, res) => {
  res.status(404).send('Route not found.');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
