const { faker } = require('@faker-js/faker');
const express = require('express');
const router = express.Router();

// TO DO: CREATE MORE ENTITIES | GET METHODS
router.get('/', (req, res) => {
  res.send({
    name: faker.person.fullName(),
    gender: faker.person.gender(),
  });
});

router.get('/subscription', () => {});

module.exports = router;
