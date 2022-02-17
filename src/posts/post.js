const router = require('express').Router();

const { Validate } = require('../utils');
const {
  createPost, getAllPost, getPost, updateUserPost, deleteUserPost
} = require('./controllers');
const { CreatePostSchema, PostByIdSchema, UpdatePostSchema } = require('./validations');

router.post('/', Validate(CreatePostSchema, true), createPost);
router.get('/', getAllPost);
router.get('/:id', Validate(PostByIdSchema), getPost);
router.put('/:id', Validate(UpdatePostSchema), updateUserPost);
router.delete('/:id', Validate(PostByIdSchema), deleteUserPost);

module.exports = { router };
