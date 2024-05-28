const boom = require('@hapi/boom');
const { models } = require('./../../libs/sequelize');

class OrdersService {
  constructor() {}

  async create(data) {
    const newOrder = await models.orders.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.orders_products.create(data);
    return newItem;
  }

  async findOne(id) {
    const order = await models.orders.findByPk(id, {
      include: [
        {
          // Because the customer already has its own association, we can include nested associations
          association: 'customer',
          include: ['user'],
        },
        'items'
      ],
    });
    return order;
  }
}
