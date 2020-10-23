const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  username: {
    type: String,
    required: true,
    max: 40,
  },
  genres: {
    // type: [String],
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  books: [
    {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
      },
      authors: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      ebookLink: {
        type: String,
      },
      imageLink: {
        type: String,
      },
      status: {
        type: String,
      },
    },
  ],
  social: {
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Profile = mongoose.model('profiles', ProfileSchema);
module.exports = Profile;
