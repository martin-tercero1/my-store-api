const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../../libs/sequelize');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate(size = 10) {
    for (let index = 0; index < size; index++) {
      this.users.push({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        //name: faker.commerce.userName(),
        password: faker.internet.password(),
      });
    }
  }

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.users.create({ ...data, password: hash });

    // dataValues because we are using sequelize
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const response = await models.users.findAll({
      include: ['customer'],
    });
    return response;
  }

  async findByEmail(email) {
    const response = await models.users.findOne({
      where: { email }
    });
    return response;
  }

  async findOne(id) {
    const user = await models.users.findByPk(id);

    if (!user) {
      throw boom.notFound('user not found');
    }
    if (user.isBlocked) {
      throw boom.conflict('user is blocked');
    } else {
      return user;
    }
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    let response = {};

    if (user === -1) {
      throw boom.notFound('user not found');
    }
    if (user.isBlocked) {
      throw boom.conflict('user is blocked');
    } else {
      response = await user.update(changes);
    }

    return response;
  }

  async delete(id) {
    const user = await this.findOne(id);

    if (user === -1) {
      throw boom.notFound('user not found');
    }
    if (user.isBlocked) {
      throw boom.conflict('user is blocked');
    } else {
      user.destroy();
      return id;
    }
  }
}

module.exports = UsersService;
