const session = require('express-session');
const passport = require('passport');

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
});

const initializePassport = (app) => {
  app.use(sessionMiddleware); 
  app.use(passport.initialize()); 
  app.use(passport.session()); 
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = { initializePassport, isAuthenticated };
