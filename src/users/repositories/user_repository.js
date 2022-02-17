const { User } = require('../models');

class UserRepository {
  static async createUser(newUser) {
    const user = await User.create(newUser);
    return user;
  }

  static async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }
}

module.exports = { UserRepository };
