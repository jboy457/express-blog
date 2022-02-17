/* eslint-disable no-underscore-dangle */
const { Upload, Response, Slugify } = require('../../utils');
const { PostRepository } = require('../repositories');

class PostService {
  static async create(req) {
    const { body, files, user } = req;
    const image = await Upload.toServer(files.image, 'post');
    if (!image) return Response.service(415, 'Unsupported Image type. Only accepts JPEG, JPG, PNG');
    const postToCreate = {
      image, ...body, userId: user._id, slug: Slugify(body.title)
    };
    const post = await PostRepository.createPost(postToCreate);
    return Response.service(201, 'Successfully created post', post);
  }

  static async findPost(req) {
    const { params } = req;
    const post = await PostRepository.findById(params.id);
    if (!post) return Response.service(404, 'Post not found');
    return Response.service(200, 'Successfully fetched post', post);
  }

  static async deletePost(req) {
    const { params, user } = req;
    const post = await PostRepository.findById(params.id);
    if (!post) return Response.service(404, 'Post not found');
    if (post.userId.toString() !== user._id.toString()) return Response.service('401', 'Post cannot be deleted');
    await post.remove();
    return Response.service(200, 'Successfully deleted post');
  }

  static async updatePost(req) {
    const {
      params, user, body, files
    } = req;
    const post = await PostRepository.findById(params.id);
    if (!post) return Response.service(404, 'Post not found');
    if (post.userId.toString() !== user._id.toString()) return Response.service('401', 'Post cannot be updated');
    if (files) {
      body.image = await Upload.toServer(files.image, 'post', post.image);

      if (!body.image) return Response.service(415, 'Unsupported Image type. Only accepts JPEG, JPG, PNG');
    }
    await post.updateOne(body);
    return Response.service(200, 'Successfully updated post');
  }

  static async findAllPost(req) {
    const { query } = req;
    const posts = await PostRepository.findAll(query.perPage, query.pageNo);
    return Response.service(200, 'Successfully fetched posts', posts);
  }
}

module.exports = { PostService };
