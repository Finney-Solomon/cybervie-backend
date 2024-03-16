const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;


passport.use(new GoogleStrategy({
   
  clientID:GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `/auth/google/callback`,
  scope: ["profile", "email"],
  },
  function(accessToken, refreshToken, profile, cb) {

    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
module.exports = passport;