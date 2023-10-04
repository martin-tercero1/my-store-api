const express = require('express');
const ProductsService = require('../services/productsServices');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('../schemas/productsSchema');
const { validatorHandler } = require('../middlewares/validatorHandler');
const router = express.Router();

const service = new ProductsService();

router.get('/', async (req, res, next) => {
  try {
    const products = await service.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// SPECIFIC ENDPOINTS SHOULD BE DEFINED BEFORE DYNAMIC
// router.get('/filter', (req, res, next) => {
//   res.send('I am a filter');
// });

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const product = await service.findOne(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(200).json({ message: 'Product not found' });
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;

      const newProduct = await service.create(body);

      res.status(201).json({
        message: 'Product created succesfully',
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json({
        message: 'Product updated successfully',
        data: product,
      });
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = await service.delete(id);
    res.json({
      message: 'Product deleted successfully',
      id: productId,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// TO DO: CREATE ALL OF THE CRUD NECESSARIES FOR THE OTHER ENTITIES
