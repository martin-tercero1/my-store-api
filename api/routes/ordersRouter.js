const express = require("express");
const passport = require('passport');

const OrdersService = require('../services/ordersServices');
const { getOrder, createOrder, addItem } = require('../schemas/ordersSchema');
const { validatorHandler } = require('../middlewares/validatorHandler');

const router = express.Router();
const service = new OrdersService();

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createOrder, 'body'),
  async (req, res, next) => {
    try {
      const body = {
        userId: req.user.sub
      };

      const newOrder = await service.create(body);

      res.status(201).json({
        message: 'Order created succesfully',
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItem, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newItem = await service.addItem(body);

      res.status(201).json({
        message: 'Order created succesfully',
        data: newItem,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
