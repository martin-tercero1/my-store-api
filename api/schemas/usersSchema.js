const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5)

const createUser = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
})

// const getUser = Joi.object({
//   id: id.required()
// })

const updateUser = Joi.object( {
  email: email,
  password: password,
  role: role
})

module.exports = {
  createUser,
  updateUser,
}
