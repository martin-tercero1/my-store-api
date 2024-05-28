const { faker } = require('@faker-js/faker');
const { Op } = require('sequelize')
const boom = require('@hapi/boom');
const { models} = require('../../libs/sequelize') // it handles a bool behind

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate(size = 10) {
    for (let index = 0; index < size; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    // const newProduct = {
    //   id: faker.string.uuid(),
    //   ...data,
    // };
    // this.products.push(newProduct);

    const newProduct = await models.products.create(data);
    return newProduct;
  }

  async find(query) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.products);
    //   }, 5000);
    // });

    // const client = await getConnection();
    // const res = await client.query('SELECT * FROM tasks');
    // return res.rows;

    // const query = 'SELECT * FROM tasks';
    // const res = await this.pool.query(query);
    // return res.rows;

    // const query = 'SELECT * FROM tasks';
    // const [data, metadata] = await sequelize.query(query);
    // return data;
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset, price, price_min, price_max } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.between]: [price_min, price_max],
      };
    }

    const products = await models.products.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    } else {
      return product;
    }
  }

  async update(id, changes) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    } else {
      this.products[index] = {
        ...product,
        ...changes,
      };
    }

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    if (product.isBlocked) {
      throw boom.conflict('Product is blocked');
    } else {
      this.products.splice(index, 1);
      return id;
    }
  }
}

module.exports = ProductsService;
