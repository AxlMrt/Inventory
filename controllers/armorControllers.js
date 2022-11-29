const Armor = require('../models/armor');

exports.index = (req, res) => {
  res.send('Armor Page')
}

exports.armor_list = (req, res) => {
  res.send('Armor List');
};

exports.armor_detail = (req, res) => {
  res.send(`${req.params.id}`);
};

exports.armor_create_get = (req, res) => {
  res.send('Armor create GET');
};

exports.armor_create_post = (req, res) => {
  res.send('Armor create POST');
};

exports.armor_delete_get = (req, res) => {
  res.send('Armor delete GET');
};

exports.armor_delete_post = (req, res) => {
  res.send('Armor delete POST');
};

exports.armor_update_get = (req, res) => {
  res.send('Armor update GET');
};

exports.armor_update_post = (req, res) => {
  res.send('armor update POST');
};