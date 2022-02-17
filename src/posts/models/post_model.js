const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
});

const Post = model('Post', PostSchema);

module.exports = { Post };
