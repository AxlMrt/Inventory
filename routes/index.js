const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const {
  productList,
  singleProduct,
  createGet,
  createPost,
  updateGet,
  updatePost,
  deleteGet,
  deletePost
} = require('../controllers/products');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

router.route('/product').get(productList);
router.get('/product/:id/detail', singleProduct);

router.get('/product/create', createGet);
router.post('/product/create', upload.single('img'), createPost);

router.get('/product/:id/update', updateGet);
router.post('/product/:id/update', upload.single("img"), updatePost);

router.get('/product/:id/delete', deleteGet);
router.post('/product/:id/delete', deletePost);

module.exports = router;
