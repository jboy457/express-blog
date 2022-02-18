/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const { connect, disconnect } = require('../../src/config');
const { User } = require('../../src/users/models');
const { deleteUpload } = require('../utils/remove_upload');

const testImage = `${__dirname}/../assets/test_image.jpeg`;
const invalidImage = `${__dirname}/../assets/invalid_image.webp`;

const existingTestCase = {
  name: 'Adejare',
  email: 'test@gmail.com',
  image: 'profile/1645114524496-3.jpeg',
  password: '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi'
};

const invalidTestCase = {
  name: 'Adejare',
  email: 'adejareemma5@gmaim',
  password: 'Ade'
};

const validTestCase = {
  name: 'Adejare',
  email: 'test1@gmail.com',
  password: 'Adejare'
};

beforeAll(async () => {
  await connect(process.env.MONGODB_URI_TEST);
  await User.create(existingTestCase);
});

afterAll(async () => {
  try {
    await User.deleteMany();
    await disconnect();
  } catch (error) {
    console.log(error);
  }
});

describe('--- Register User Test ---', () => {
  // ===================== Test Validation ================== //
  it('should return status 422', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .send(invalidTestCase);
    expect(response.statusCode).toEqual(422);
    expect(response.body.status).toEqual('error');
  });

  // ===================== User Already Regiseted ================== //
  it('should return status 409', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .attach('image', testImage)
      .field('name', existingTestCase.name)
      .field('email', existingTestCase.email)
      .field('password', 'Adejare');

    expect(response.statusCode).toEqual(409);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('User already exist');
  });

  // ===================== Image Type Uploaded ================== //
  it('should return status 415', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .attach('image', invalidImage)
      .field('name', validTestCase.name)
      .field('email', validTestCase.email)
      .field('password', validTestCase.password);

    expect(response.statusCode).toEqual(415);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Unsupported Image type. Only accepts JPEG, JPG, PNG');
  });

  // ===================== Successful Registration ================== //
  it('should return status 201', async () => {
    const response = await request(app)
      .post('/api/v1/users/register')
      .attach('image', testImage)
      .field('name', validTestCase.name)
      .field('email', validTestCase.email)
      .field('password', validTestCase.password);

    expect(response.statusCode).toEqual(201);
    expect(response.body.status).toEqual('success');
    expect(response.body.data.email).toEqual(validTestCase.email);
    await deleteUpload(response.body.data.image);
  });
});
