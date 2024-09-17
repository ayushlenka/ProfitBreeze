const SellerSettings = require('../Database/schemas');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Google OAuth authentication
const googleAuth = passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'  
  });

// Google OAuth callback handling
const googleAuthCallback = async (req, res) => {
  try {
    const token = req.user.token;
    res.cookie('jwt', token, { httpOnly: true, secure: false }); //Cookies
    res.redirect('https://profitbreeze.netlify.app/'); // Redirect back to homepage
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during authentication' });
  }
};

// Google OAuth Logout
const googleLogout = (req, res) => {
    res.clearCookie('jwt'); // Clear the JWT cookie
    if (req.session) {
        req.session.destroy(err => {
            if (err) return res.status(500).send('Logout failed');
            res.status(200).send('Logout successful');
        });
    } else {
        res.status(200).send('Logout successful');
    }
};

// JWT Authentication
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt;

  console.log('Received token:', token);

  if (!token) {
      console.log('No token provided');
      return res.status(400).json({ valid: false, error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
          console.log('JWT verification failed:', err);
          return res.status(401).json({ valid: false, error: 'Token invalid or expired' });
      }

      console.log('Decoded JWT:', decoded);
      req.user = decoded;  
      next();  
  });
};


module.exports = {
    googleAuth,
    googleAuthCallback,
    googleLogout,
    authenticateJWT,
}