const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const User = require("../models/user_login_model");
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, cb) => {

 
  try {
      let user = await User.findOne({ email: profile._json.email });

      if (user) {
          // User already exists, update token if necessary
          if (!user.googleToken) {
              // If user doesn't have a token, update it
              user.googleToken = accessToken;
              await user.save();
             
          }
          return cb(null, user);
      } else {

        console.log(user,"user passport")
          // User doesn't exist, create a new user
    
          user = new User({
              userName: profile._json.name,
              email: profile._json.email,
              userType: "user", // Set the user's role as "user"
              googleToken: accessToken,
              image: profile._json.picture
          });

          console.log(user,"user")
          await user.save();
          return cb(null, user);
      }
  } catch (error) {
      return cb(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (error) {
      done(error);
  }
});

module.exports = passport;