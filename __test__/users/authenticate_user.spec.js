/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const { connect, disconnect } = require('../../src/config');
const { User } = require('../../src/users/models');

const existingTestCase = {
  name: 'Adejare',
  email: 'test@gmail.com',
  image: 'profile/1645114524496-3.jpeg',
  password: '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi'
};

const invalidTestCase = {
  email: 'adejareemma5@gmaim',
  password: 'Ade'
};

const loginWithWrongPasswrd = {
  email: 'test@gmail.com',
  password: 'Adejare1234'
};

const loginWithWrongEmail = {
  email: 'test12@gmail.com',
  password: 'Adejare'
};

const validTestCase = {
  email: 'test@gmail.com',
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

describe('--- Login User Test ---', () => {
  // ===================== Test Validation ================== //
  it('should return status 422', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(invalidTestCase);
    expect(response.statusCode).toEqual(422);
    expect(response.body.status).toEqual('error');
  });

  // ===================== Login credentail with wrong email ================== //
  it('should return status 401', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(loginWithWrongEmail);

    expect(response.statusCode).toEqual(401);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Invalid email or password');
  });

  // ===================== Login credentail with wrong password ================== //
  it('should return status 401', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(loginWithWrongPasswrd);

    expect(response.statusCode).toEqual(401);
    expect(response.body.status).toEqual('error');
    expect(response.body.message).toEqual('Invalid email or password');
  });

  // ===================== Login With correct credentials ================== //
  it('should return status 201', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send(validTestCase);

    expect(response.statusCode).toEqual(200);
    expect(response.body.status).toEqual('success');
    expect(response.body.data.user.email).toEqual(validTestCase.email);
  });
});
