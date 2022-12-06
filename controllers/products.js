var multer = require('multer');
var upload = multer({ dest: 'public/images/' });

const { body, validationResult } = require('express-validator');

const Product = require('../models/product');

const productList = async (req, res, next) => {
  Product.find()
    .select()
    .exec(function (error, products) {
      if (error) next(error);
      res.render('product_list', { title: 'Product list', products });
    });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } =
    req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

const createGet = async (req, res) => {
  res.render('form', { title: 'new item' });
};

const createPost = [
  body("name")
    .exists()
    .withMessage("Name of product must be specified.")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("company")
    .exists()
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Name of company must be specified."),
  body("price")
    .exists()
    .withMessage("Product must have a price")
    .isNumeric()
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const receivedPath = req.file.path;
    const cleanedPath = receivedPath.slice(6);
  
    const product = new Product({
      img: cleanedPath,
      name: req.body.name,
      company: req.body.company,
      price: req.body.price,
    });

    if (!errors.isEmpty()) {
      //there are errors, render the form again with remarks considered.

      Product.find().exec(async function (err, results) {
        if (err) {
          return next(err);
        }
        res.render('form', {
          title: 'Add New Model',
          product: product,
          errors: errors.array()
        });
      });
      return;
    } else {
      product.save(async function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(product.name);
      });
    }
  },
];

module.exports = {
  productList,
  getAllProducts,
  createGet,
  createPost,
};
