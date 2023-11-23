const { faker } = require('@faker-js/faker');
const express = require('express');
const usersServices = require('../services/usersServices');
const {
  getUsers
} = require('../schemas/usersSchema')
const router = express.Router();

const service = new usersServices();

// TO DO: CREATE MORE ENTITIES | GET METHODS
// return all users
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// delete an user


// return the
router.get('/subscription', () => {});

module.exports = router;
