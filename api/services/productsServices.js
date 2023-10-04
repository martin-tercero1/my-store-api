const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

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
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
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
