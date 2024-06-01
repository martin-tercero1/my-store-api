const express = require('express');
const router = express.Router();
const passport = require('passport');

const AuthService = require('./../services/authService');
const service = new AuthService();

// create an user
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      // we can use a schema to validate this data
      const { email } = req.body;
      const result = await service.sendRecovery(email);
      res.json(result);
    } catch (error) {
      next(error)
    }
  }
);

// TO DO VALIDATE DATA
router.post('/change-password', async (req, res, next) => {
  try {
    // we can use a schema to validate this data
    const { token, newPassword } = req.body;
    const result = await service.sendRecovery(email);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
