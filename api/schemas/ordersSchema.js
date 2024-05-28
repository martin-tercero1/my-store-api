const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrder = Joi.object({
  id: id.required(),
});

const createOrder = Joi.object({
  customerId: customerId.required(),
});

const addItem = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  getOrder,
  createOrder,
  addItem
};
