const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const firestore = require('../data/db'); 
const { generateToken } = require('../middleware/authMiddleware');


const filterUser = async (userProfile) => {
  const userRef = firestore.collection('users').doc(userProfile.id);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    const newUser = {
      id: userProfile.id,
      email: userProfile.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      isProfileComplete: false, 
    };

    await userRef.set(newUser);
    return newUser;
  }

  return userDoc.data(); 
};

// Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userProfile = {
          id: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
        };

        const user = await filterUser(userProfile);
        const token = generateToken(user);
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Facebook OAuth
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails ? profile.emails[0].value : `${profile.id}@facebook.com`;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;

        const userProfile = {
          id: profile.id,
          email,
          firstName,
          lastName,
        };

        const user = await filterUser(userProfile);
        const token = generateToken(user);
        return done(null, { user, token });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
