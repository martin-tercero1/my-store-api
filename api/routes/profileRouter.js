const express = require('express');
const passport = require('passport');

const OrdersService = require('../services/ordersServices');

const router = express.Router();
const service = new OrdersService();

// create an user
router.get(
  '/my-orders',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
