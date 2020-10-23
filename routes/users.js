const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../config/keys');

const router = express.Router();

// Load User model
const User = require('../models/User');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// @route   GET /users/register
// @desc    Register users route
// @access  Public
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const findEmail = await User.findOne({ email: req.body.email });
    if (findEmail) {
      return res.status(400).json({ email: 'Email already exists' });
    }
    const avatar = await gravatar.url(req.body.email, {
      s: '200', // Size
      r: 'pg', // Rating
      d: 'mm', // Default
    });
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          const saveUser = await newUser.save();
          res.json(saveUser);
        } catch (error) {
          console.log(error);
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

// @route   Post /users/login
// @desc    Login User / Retrieve JWT
// @access  Public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;
  // Find user by email
  const getUser = await User.findOne({ email });
  // Check for user
  if (!getUser) {
    return res.status(404).json({ email: 'User email not found' });
  }
  // Check password
  const findPassword = await bcrypt.compare(password, getUser.password);
  if (findPassword) {
    // User Matched
    const payload = {
      id: getUser.id,
      name: getUser.name,
      avatar: getUser.avatar,
    }; // Create JWT Payload
    // Sign token
    jwt.sign(payload, keys.secretOrKey, { expiresIn: '1 days' }, (err, token) => {
      res.json({
        success: true,
        token: `Bearer ${token}`,
      });
    });
  } else {
    return res.status(400).json({
      password: 'Incorrect Password',
    });
  }
});

// @route   Post /users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.json(req.user);
});

module.exports = router;
