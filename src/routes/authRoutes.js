const express = require('express');
const passport = require('../auth/socialAuth');

const router = express.Router();

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const { user, token } = req.user;

    if (!user.isProfileComplete) {
      res.json({
        message: 'New user, complete the signup form',
        redirectTo: '/profile/complete',
        user,
        token,
      });
    } else {
      res.json({ message: 'Login successful', user, token });
    }
  }
);

// Facebook OAuth login
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook OAuth callback
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const { user, token } = req.user;

    if (!user.isProfileComplete) {
      res.json({
        message: 'New user, complete the signup form',
        redirectTo: '/profile/complete',
        user,
        token,
      });
    } else {
      res.json({ message: 'Login successful', user, token });
    }
  }
);

module.exports = router;
