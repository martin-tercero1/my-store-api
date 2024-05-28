const { faker } = require('@faker-js/faker');
const express = require('express');
const usersServices = require('../services/usersServices');
const {
  createUser,
  updateUser,
  deleteUser
} = require('../schemas/usersSchema');
const { validatorHandler } = require('../middlewares/validatorHandler');
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

// get one user
router.get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;

      const users = await service.findOne(id);

      res.json(users);
    } catch (error) {
      next(error);
    }
});

// create an user
router.post('/', validatorHandler(createUser, 'body'), async(req, res, next) => {
  try {
    const body = req.body

    const newUser = await service.create(body);

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
})

// delete an user
router.delete('/:id', async(req, res, next) => {
  try {
    const id= req.params.id;
    const userId = await service.delete(id);
    res.json({
      message: 'User deleted successfully',
      id: userId,
    });
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const changes = req.body;
    const userId = await service.update(id, changes);
    res.json({
      message: 'User updated successfully',
      id: userId,
    });
  } catch (error) {
    next(error);
  }
});

// return the
router.get('/subscription', () => {});

module.exports = router;
