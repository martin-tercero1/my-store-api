const express = require('express');
const passport = require('passport');
const categoriesServices = require('../services/categoriesServices');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkAdminRole, checkRoles } = require('./../middlewares/authHandler');
const {
  createCategory,
  updateCategory,
  getCategory,
} = require('./../schemas/categoriesSchema');

// TO DO - Protect the rest of the routes

const router = express.Router();

// router.get('/', (req, res) => {
//   res.json([
//     { name: 'Electronics', total: 32 },
//     { name: 'Clothing', total: 2 },
//   ]);
// });

// router.get('/:categoryId/products/:productId', (req, res) => {
//   const { categoryId, productId } = req.params;
//   res.json({
//     categoryId,
//     productId,
//   });
// });

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
      const categories = await categoriesServices.find();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  checkRoles('admin', 'customer'),
  validatorHandler(getCategory, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await categoriesServices.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCategory, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await categoriesServices.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getCategory, 'params'),
  validatorHandler(updateCategory, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await categoriesServices.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getCategory, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await categoriesServices.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
