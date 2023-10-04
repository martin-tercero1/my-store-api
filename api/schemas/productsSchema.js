const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(15).min(3);
const price = Joi.number().integer().min(10).max(1500);
const image = Joi.string().uri();

const getProductSchema = Joi.object({
  id: id.required(),
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image
});

module.exports = {
  getProductSchema,
  createProductSchema,
  updateProductSchema
}
