/* eslint-disable no-underscore-dangle */
const {
  Hash, Response, JWT, Upload
} = require('../../utils');
const { UserRepository } = require('../repositories');

class UserService {
  static async create(req) {
    const { name, email, password } = req.body;
    const user = await UserRepository.findByEmail(email);
    if (user) return Response.service(409, 'User already exist');
    const hashPassword = await Hash.create(password);
    const image = await Upload.toServer(req.files.image, 'profile');
    if (!image) return Response.service(415, 'Unsopported Image type. Only accepts JPEG, JPG, PNG');
    const newUser = await UserRepository.createUser({
      name, email, image, password: hashPassword
    });
    newUser.password = undefined;
    return Response.service(201, 'Successfully created user', newUser);
  }

  static async authenticate(req) {
    const { email, password } = req.body;
    const user = await UserRepository.findByEmail(email);
    if (!user) return Response.service(401, 'Invalid email or password');
    const passwordValid = await Hash.verify(password, user.password);
    if (!passwordValid) return Response.service(401, 'Invalid email or password');
    const token = await JWT.sign({
      _id: user._id,
      email: user.email
    });
    user.password = undefined;
    return Response.service(200, 'Successfully authenticated user', { user, token });
  }
}

module.exports = { UserService };
