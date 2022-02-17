const { Post } = require('../models');

class PostRepository {
  static async createPost(newPost) {
    const post = await Post.create(newPost);
    return post;
  }

  static async findById(_id) {
    const post = await Post.findById(_id);
    return post;
  }

  static async update(_id, postToUpdate) {
    const post = await Post.updateOne(_id, postToUpdate);
    return post;
  }

  static async delete(_id) {
    await Post.deleteOne(_id);
  }

  static async findAll(limit = 10, pageNo) {
    const post = await Post.find({ limit, skip: pageNo * (limit - 1) });
    return post;
  }
}

module.exports = { PostRepository };
