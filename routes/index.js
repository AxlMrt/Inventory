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
  createGet,
  createPost,
} = require('../controllers/products');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

router.route('/product').get(productList);

router.get('/product/create', createGet);
router.post('/product/create', upload.single('img'), createPost);

module.exports = router;
