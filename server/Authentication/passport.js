const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const SellerSettings = require('../Database/schemas');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  prompt: 'select_account'
},
async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(`Google profile received: ${JSON.stringify(profile, null, 2)}`);

    let user = await SellerSettings.findOne({ googleId: profile.id });
    // If user doesn't exist, create new user
    if (!user) {
      console.log('User does not exist, creating a new user...');
      user = new SellerSettings({
        googleId: profile.id,
        email: profile.emails[0].value,
      });
      await user.save();
      console.log('New user created and saved:', user);
    } else {
      console.log('User exists:', user);
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT Token generated:', token);

    return done(null, { user, token });  
  } catch (err) {
    console.error('Error in Google OAuth strategy:', err);
    return done(err, false);  
  }
}));

