const Weapon = require('../models/weapon');

exports.weapon_list = (req, res) => {
  res.send('weapon List');
};

exports.weapon_detail = (req, res) => {
  res.send(`${req.params.id}`);
};

exports.weapon_create_get = (req, res) => {
  res.send('weapon create GET');
};

exports.weapon_create_post = (req, res) => {
  res.send('weapon create POST');
};

exports.weapon_delete_get = (req, res) => {
  res.send('weapon delete GET');
};

exports.weapon_delete_post = (req, res) => {
  res.send('weapon delete POST');
};

exports.weapon_update_get = (req, res) => {
  res.send('weapon update GET');
};

exports.weapon_update_post = (req, res) => {
  res.send('weapon update POST');
};