var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/equipments', (req, res) => {
  res.render('equipments', { title: 'Equipments' });
});

module.exports = router;