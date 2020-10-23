const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load Validation
const validateProfileInput = require('../validation/profile');
const validateBookInput = require('../validation/books');
// Load Profile Model
const Profile = require('../models/Profile');
// Load User Model
const User = require('../models/User');

// @route   GET /profile
// @desc    Get current users profile
// @access  Private

// @route   GET /profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const errors = {};
    const getAll = await Profile.find().populate('user', ['name', 'avatar']);
    if (!getAll) {
      errors.noprofile = 'There are no profiles';
      res.status(404).json(errors);
    }
    res.json(getAll);
  } catch (error) {
    res.status(404).json({ profile: 'There are no profiles' });
  }
});

// @route   GET /profile/username/:username
// @desc    Get profile by username
// @access  Public
router.get('/username/:username', async (req, res) => {
  try {
    const errors = {};
    const getUserName = await Profile.findOne({ username: req.params.username }).populate('user', [
      'name',
      'avatar',
    ]);
    if (!getUserName) {
      errors.noprofile = 'No profile for this user';
      res.status(404).json(errors);
    }
    res.json(getUserName);
  } catch (error) {
    res.status(404).json(error);
  }
});

// @route   GET /profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const errors = {};
    const getUserId = await Profile.findOne({ user: req.params.user_id }).populate('user', [
      'name',
      'avatar',
    ]);
    if (!getUserId) {
      errors.noprofile = 'No profile for this user';
      res.status(404).json(errors);
    }
    res.json(getUserId);
  } catch (error) {
    res.status(404).json({ profile: 'There is no profile for this user' });
  }
});

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const errors = {};
    const getProfile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);
    if (!getProfile) {
      errors.noprofile = 'No profile found';
      return res.status(404).json(errors);
    }
    res.json(getProfile);
  } catch (error) {
    res.status(404).json(error);
  }
});

// @route   POST /profile
// @desc    Create or Edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.username) profileFields.username = req.body.username;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.genres) profileFields.genres = req.body.genres;
  // Genre - Spilt into array
  if (typeof req.body.genres !== 'undefined') {
    profileFields.genres = req.body.genres;
  }

  // Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  const getProfile = await Profile.findOne({ user: req.user.id });
  if (getProfile) {
    // Update
    await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
    res.json(getProfile);
  } else {
    // Create

    // Check if username exists
    const getUserName = await Profile.findOne({ username: profileFields.username });
    if (getUserName) {
      errors.username = 'Username already exists';
      res.status(400).json(errors);
    }

    // Save Profile
    new Profile(profileFields).save().then(profile => res.json(profile));
  }
});

// @route   POST /profile/books
// @desc    Add books to profile
// @access  Private
router.post('/books', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateBookInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  const profile = await Profile.findOne({ user: req.user.id });
  try {
    const {
      title, subtitle, authors, description, imageLink, status,
    } = req.body;
    const newBooks = {
      title,
      subtitle,
      authors,
      description,
      imageLink,
      status,
    };
    // Add to book array
    profile.books.unshift(newBooks);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error);
  }
});

// @route   DELETE /profile/books/:book_id
// @desc    Delete books from profile
// @access  Private
router.delete(
  '/books/:book_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      // Get remove index
      const removeIndex = await profile.books.map(item => item.id).indexOf(req.params.book_id);

      // Splice out of array
      profile.books.splice(removeIndex, 1);

      // Save
      await profile.save();
      res.json(profile);
    } catch (err) {
      res.status(404).json(err);
    }
  },
);
// @route   DELETE /profile
// @desc    Delete User and Profile
// @access  Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ success: true });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
