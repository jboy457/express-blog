/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');
const { connect, disconnect, redisClient } = require('../../src/config');
const { Post } = require('../../src/posts/models');
const { User } = require('../../src/users/models');

let token = '';

const userTestCase = {
  name: 'Adejare',
  email: 'test@gmail.com',
  image: 'profile/1645114524496-3.jpeg',
  password: '$2a$10$JR0suUOk6nvd4y6Gul0YOekzTBJN6PnVev4Hh25gFb.0lI9DJUqEi'
};

const validLoginTestCase = {
  email: 'test@gmail.com',
  password: 'Adejare'
};

const postTestCase = [
  {
    title: 'The Good Boy',
    userId: '620de528545d108b95b34914',
    description: 'This is best thing that has happend to me',
    slug: 'the-good-boy',
    image: 'post/1645107827100-3.jpeg'
  },
  {
    title: 'The Good Boy 12323 324234',
    userId: '620de528545d108b95b34914',
    description: 'This is best thing that has happend to me',
    slug: 'the-good-boy-12323-324234',
    image: 'post/1645107827100-3.jpeg'
  },
  {
    title: 'The Good Boy 12323 324234 ❤️',
    userId: '620de528545d108b95b34914',
    description: 'This is best thing that has happend to me',
    slug: 'the-good-boy-12323-324234-1645085102757',
    image: 'post/1645107827100-3.jpeg'
  },
  {
    title: 'The Good Boy 12323 324234 ❤️',
    userId: '620de528545d108b95b34914',
    description: 'This is best thing that has happend to me',
    slug: 'the-good-boy-12323-324234-1645085406533',
    image: 'post/1645107827100-3.jpeg'
  },
  {
    title: 'The Lore ❤️',
    userId: '620de528545d108b95b34914',
    description: 'This is best thing that has happend to me',
    slug: 'the-good-boy-12323-324234-1645085494614',
    image: 'post/1645101779323-3.jpeg'
  },
  {
    title: 'The Good Boy 12323 324234 ❤️',
    userId: '620de528545d108b95b34914',
    description: 'This is best thing that has happend to me',
    slug: 'the-good-boy-12323-324234-1645087187900',
    image: 'post/1645087187900-4.jpeg'
  },
  {
    title: 'The Good Boy 12323 324234 ❤️',
    userId: '620de528545d108b95b34914',
    description: 'This is best thing that has happend to me',
    slug: 'the-good-boy-12323-324234-1645087258745',
    image: 'post/1645087258744-4.jpeg'
  },
  {
    title: 'Adejare blog',
    userId: '620dcda6ab3bea977d1a51e0',
    description: 'akf asdfj adskjflaksjdf adjf laskdjf alkdsjf adklsjf ldskfja dsfj ldskjf aldkjf laksjdfsadf',
    slug: 'adejare-blog-1645107827101',
    image: 'post/1645107827100-3.jpeg'
  }
];

beforeAll(async () => {
  await connect(process.env.MONGODB_URI_TEST);
  await redisClient.connect();
  await User.create(userTestCase);
  await Post.insertMany(postTestCase);
  const response = await request(app)
    .post('/api/v1/users/login').send(validLoginTestCase);
  token = response.body.data.token;
});

afterAll(async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await redisClient.disconnect();
    await disconnect();
  } catch (error) {
    console.log(error);
  }
});

describe('--- Get Post ---', () => {
  // ===================== Get All Post ================== //
  it('should return status 200', async () => {
    const response = await request(app)
      .get('/api/v1/posts')
      .set('x-auth-token', token);

    expect(response.statusCode).toEqual(200);
    expect(response.body.status).toEqual('success');
  });

  // ===================== Cant Find Post ================== //
  it('should return status 404', async () => {
    const invalidId = '620e5a73d42e90d9a9dae39b';
    const response = await request(app)
      .get(`/api/v1/posts/${invalidId}`)
      .set('x-auth-token', token);
    expect(response.statusCode).toEqual(404);
    expect(response.body.status).toEqual('error');
  });
});
