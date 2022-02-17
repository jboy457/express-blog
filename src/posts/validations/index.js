const { CreatePostSchema } = require('./create_post');
const { PostByIdSchema } = require('./post_by_id');
const { UpdatePostSchema } = require('./update_post');

module.exports = Object.freeze({
  CreatePostSchema,
  PostByIdSchema,
  UpdatePostSchema
});
