const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('./../../libs/sequelize');

class CategoriesService {
  constructor() {}

  
  async create(data) {
    const newCategory = await models.categories.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.categories.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.categories.findByPk(id, {
      include: ['products'],
    });
    return category;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = CategoriesService;
