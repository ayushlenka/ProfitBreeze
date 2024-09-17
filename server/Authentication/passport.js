// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const jwt = require('jsonwebtoken');
// const SellerSettings = require('../Database/schemas');

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL,
//   prompt: 'select_account'
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     console.log(`Google profile received: ${JSON.stringify(profile, null, 2)}`);

//     let user = await SellerSettings.findOne({ googleId: profile.id });
//     // If user doesn't exist, create new user
//     if (!user) {
//       console.log('User does not exist, creating a new user...');
//       user = new SellerSettings({
//         googleId: profile.id,
//         email: profile.emails[0].value,
//       });
//       await user.save();
//       console.log('New user created and saved:', user);
//     } else {
//       console.log('User exists:', user);
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     console.log('JWT Token generated:', token);

//     return done(null, { user, token });  
//   } catch (err) {
//     console.error('Error in Google OAuth strategy:', err);
//     return done(err, false);  
//   }
// }));


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

    // First, check if the user exists by googleId
    let user = await SellerSettings.findOne({ googleId: profile.id });
    
    // If no user with the googleId is found, check for existing email
    if (!user) {
      console.log('User with googleId does not exist, checking for email...');

      user = await SellerSettings.findOne({ email: profile.emails[0].value });

      if (!user) {
        console.log('No user with this email, creating a new user...');
        // Create a new user since neither googleId nor email was found
        user = new SellerSettings({
          googleId: profile.id,
          email: profile.emails[0].value,
        });
        await user.save();
        console.log('New user created and saved:', user);
      } else {
        console.log('User with this email already exists:', user);
        // If email exists but googleId is not linked, update the existing user
        user.googleId = profile.id;
        await user.save();
      }
    } else {
      console.log('User with googleId exists:', user);
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
