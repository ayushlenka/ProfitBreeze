const express = require("express");
const axios = require('axios');
const passport = require('passport');
const {googleAuth, googleAuthCallback, googleLogout, verifyToken, authenticateJWT,} = require('./Authentication/authcontrollers')
const {calculateStockXProfit, calculateStockXVsGOATProfit, calculateGOATProfit} = require('./Calculators/calccontrollers');
const { getUserSettings, updateUserSettings } = require("./UserSettings/usercontrollers");
const { chatbotReply } = require("./ChatBot/chatcontrollers");
const rateLimit = require('express-rate-limit');
const router = express.Router();

//Rate limiting
const chatbotLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, 
  message: 'Too many requests, please try again after 15 minutes.',
});

const calculatorLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 20, 
  message: 'Too many requests, please try again after 5 minutes.',
});

// Google OAuth/JWT routes
router.get('/auth/google/login', googleAuth);
router.get('/auth/google/callback', passport.authenticate('google', { session: false }), googleAuthCallback);
router.get('/auth/google/logout', googleLogout);
router.post('/auth/verifytoken', authenticateJWT, (req, res) => {
    res.json({ valid: true, user: req.user });
});

// User Setting routes
router.put('/settings/update',authenticateJWT, updateUserSettings);
router.get('/settings/get',authenticateJWT, getUserSettings);

// GPT-4o-mini API Route
router.post('/chatbot', chatbotLimiter,  chatbotReply);


// Calculator API routes
router.post('/calculators/calculate/stockX', calculatorLimiter, calculateStockXProfit);
router.post('/calculators/calculate/GOAT', calculatorLimiter, calculateGOATProfit);
router.post('/calculators/calculate/StockXVSGOAT', calculatorLimiter, calculateStockXVsGOATProfit)



module.exports = router;