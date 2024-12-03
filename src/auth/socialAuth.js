const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../data/db');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const userDoc = await db.collection('users').doc(id).get();
    if (!userDoc.exists) return done(new Error('User tidak ditemukan.'));
    done(null, userDoc.data());
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = db.collection('users');
        const userDoc = await usersCollection.where('email', '==', profile.emails[0].value).get();

        let user;
        if (userDoc.empty) {
          user = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            provider: 'google',
            isProfileComplete: false,
          };
          const newUserRef = await usersCollection.add(user);
          user.id = newUserRef.id;
        } else {
          user = userDoc.docs[0].data();
          user.id = userDoc.docs[0].id;
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const usersCollection = db.collection('users');
        const userDoc = await usersCollection.where('email', '==', profile.emails[0].value).get();

        let user;
        if (userDoc.empty) {
          user = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            provider: 'facebook',
            isProfileComplete: false,
          };
          const newUserRef = await usersCollection.add(user);
          user.id = newUserRef.id;
        } else {
          user = userDoc.docs[0].data();
          user.id = userDoc.docs[0].id;
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
