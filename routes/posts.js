const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const router = express.Router();

// Load Post Model
const Post = require('../models/Post');

// Load Profile Model
const Profile = require('../models/Profile');

// Post Validation
const validatePostInput = require('../validation/post');

// @route   POST /posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  const { text, name, avatar } = req.body;
  const newPost = await new Post({
    text,
    name,
    avatar,
    user: req.user.id,
  });
  const savePost = await newPost.save();
  res.json(savePost);
});

// @route   GET /posts
// @desc    Get post
// @access  Public
router.get('/', async (req, res) => {
  try {
    const getPost = await Post.find().sort({ date: -1 });
    res.json(getPost);
  } catch (error) {
    res.status(404).json({ nopostfound: 'No posts found' });
  }
});

// @route   GET /posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const getSinglePost = await Post.findById(req.params.id);
    res.json(getSinglePost);
  } catch (error) {
    res.status(404).json({ nopostfound: 'No post found with that ID' });
  }
});

// @route   DELETE /posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id });
    const getPost = await Post.findById(req.params.id);

    // Check for post owner
    if (getPost.user.toString() !== req.user.id) {
      return res.status(401).json({ notauthorized: 'User not authorized' });
    }

    // Delete
    getPost.remove().then(() => res.json({ success: true }));
  } catch (error) {
    res.status(404).json({ postnotfound: 'No post found' });
  }
});

// @route   POST /posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id });
    const postToLike = await Post.findById(req.params.id);

    if (postToLike.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ liked: 'You can like the same post only once' });
    }

    // Add user id to likes array
    postToLike.likes.unshift({ user: req.user.id });
    const saveLike = await postToLike.save();
    res.json(saveLike);
  } catch (error) {
    res.status(404).json({ postnotfound: 'No post found' });
  }
});

// @route   POST /posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    await Profile.findOne({ user: req.user.id });
    const unlikePost = await Post.findById(req.params.id);

    if (unlikePost.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ notliked: 'You have not yet liked this post' });
    }

    // Get remove index
    const removeIndex = unlikePost.likes.map(item => item.user.toString()).indexOf(req.user.id);
    // Splice out of array
    unlikePost.likes.splice(removeIndex, 1);
    // Save
    const postUnliked = await unlikePost.save();
    res.json(postUnliked);
  } catch (error) {
    res.status(404).json({ postnotfound: 'No post found' });
  }
});

// @route   POST /posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }
  try {
    const getPost = await Post.findById(req.params.id);
    const { text, name, avatar } = req.body;

    const newComment = {
      text,
      name,
      avatar,
      user: req.user.id,
    };
    getPost.comments.unshift(newComment);
    const saveComment = await getPost.save();
    res.json(saveComment);
  } catch (error) {
    res.status(404).json({ postsnotfound: 'No post found' });
  }
});

// @route   DELETE /posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const getComment = await Post.findById(req.params.id);
      // Check to see if comment exists
      if (
        getComment.comments.filter(comment => comment._id.toString() === req.params.comment_id)
          .length === 0
      ) {
        return res.status(404).json({ commentnotexists: 'Comment does not exist' });
      }
      // Get remove index
      const removeIndex = getComment.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Splice out of array
      getComment.comments.splice(removeIndex, 1);

      const savedDeletedComment = await getComment.save();
      res.json(savedDeletedComment);
    } catch (error) {
      res.status(404).json({ postsnotfound: 'No post found' });
    }
  },
);

module.exports = router;
