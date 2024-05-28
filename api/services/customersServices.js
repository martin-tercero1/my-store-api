const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class CustomersService {
  constructor() {
  }

  async create(data) {
    // We can create on the go, the user and then the customer
    const newCustomer = await models.customers.create(data, {
      include: ['user']
    });
    return newCustomer;
  }

  async find() {
    const response = await models.customers.findAll({
      include: ['user']
    });
    return response;
  }

  async findOne(id) {
    const user = await models.customers.findByPk(id);

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
      return { response: true };
    }
  }
}

module.exports = CustomersService;
