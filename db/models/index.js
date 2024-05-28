const { Users, UserSchema } = require('./usersModel')
const { Customers, CustomersSchema } = require('./customersModel');
const { Products, ProductsSchema } = require('./productsModel');
const { Categories, CategoriesSchema } = require('./categoriesModel');
const { Orders, OrdersSchema } = require('./ordersModel');
const { OrdersProducts, OrdersProductsSchema } = require('./ordersProductsModel');


function setupModels(sequelize) {
  Users.init(UserSchema, Users.config(sequelize));
  Customers.init(CustomersSchema, Customers.config(sequelize));
  Products.init(ProductsSchema, Products.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  Orders.init(OrdersSchema, Orders.config(sequelize));
  OrdersProducts.init(OrdersProductsSchema, OrdersProducts.config(sequelize));

  // The relationships go after the initialitations for the models
  Users.associate(sequelize.models);
  Customers.associate(sequelize.models);
  Categories.associate(sequelize.models);
  Products.associate(sequelize.models);
  Orders.associate(sequelize.models);
  OrdersProducts.associate(sequelize.models);
}

module.exports = setupModels;
