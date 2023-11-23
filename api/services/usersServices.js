const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
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
        password: faker.internet.password()
      });
    }
  }

  async create(data) {
    const newuser = {
      id: faker.string.uuid(),
      ...data,
    };
    this.users.push(newuser);
    return newuser;
  }

  async find() {
    const results = await models.users.findAll();
    console.log(results);
    return results;
  }

  async findOne(id) {
    const user = this.users.find((user) => user.id === id);

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
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw boom.notFound('user not found');
    }
    const user = this.users[index];
    if (user.isBlocked) {
      throw boom.conflict('user is blocked');
    } else {
      this.users[index] = {
        ...user,
        ...changes,
      };
    }

    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw boom.notFound('user not found');
    }
    const user = this.users[index];
    if (user.isBlocked) {
      throw boom.conflict('user is blocked');
    } else {
      this.users.splice(index, 1);
      return id;
    }
  }
}

module.exports = UsersService;
