/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const { connect, disconnect, redisClient } = require('../../src/config');
const { Post } = require('../../src/posts/models');
const { User } = require('../../src/users/models');
const { deleteUpload } = require('../utils/remove_upload');

const testImage = `${__dirname}/../assets/test_image.jpeg`;
const invalidImage = `${__dirname}/../assets/invalid_image.webp`;

let token = '';
const invalidToken = 'adsfjfakun92ndcn298dn923dj283hd23kjd2i';

const userTestCase = {
  name: 'Adejare',
  email: 'test@gmail.com',
  image: 'profile/1645114524496-3.jpeg',
  password: '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi'
};

const testCase = {
  title: 'thhis is my title',
  description: 'Testing Testing description'
};

const validLoginTestCase = {
  email: 'test@gmail.com',
  password: 'Adejare'
};

beforeAll(async () => {
  await connect(process.env.MONGODB_URI_TEST);
  await redisClient.connect();
  await User.create(userTestCase);
  const response = await request(app)
    .post('/api/v1/users/login').send(validLoginTestCase);
  token = response.body.data.token;
});

afterAll(async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await disconnect();
    await redisClient.disconnect();
  } catch (error) {
    console.log(error);
  }
});

describe('--- Create User Post ---', () => {
  // ===================== Test Validation ================== //
  it('should return status 422', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .send(testCase)
      .set('x-auth-token', token);

    expect(response.statusCode).toEqual(422);
    expect(response.body.status).toEqual('error');
  });

  // ===================== Test Authorization ================== //
  it('should return status 401', async () => {
    const response = await request(app)
      .post('/api/v1/posts').set('x-auth-token', invalidToken);

    expect(response.statusCode).toEqual(401);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Session Expired');
  });

  // ===================== Image Type Uploaded ================== //
  it('should return status 415', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .set('x-auth-token', token)
      .attach('image', invalidImage)
      .field('title', testCase.title)
      .field('description', testCase.description);

    expect(response.statusCode).toEqual(415);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Unsupported Image type. Only accepts JPEG, JPG, PNG');
  });

  // ===================== Successful Create Post ================== //
  it('should return status 201', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .set('x-auth-token', token)
      .attach('image', testImage)
      .field('title', testCase.title)
      .field('description', testCase.description);

    expect(response.statusCode).toEqual(201);
    expect(response.body.status).toEqual('success');
    expect(response.body.data.title).toEqual(testCase.title);
    await deleteUpload(response.body.data.image);
  });
});
