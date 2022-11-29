const express = require('express');
const router = express.Router();

const armor_controller = require('../controllers/armorControllers');
const weapon_controller = require('../controllers/weaponControllers');

//Armor controllers

router.get('/', armor_controller.index);

router.get('/armor/create', armor_controller.armor_create_get);
router.post('/armor/create', armor_controller.armor_create_post);

router.get('/armor/:id/delete', armor_controller.armor_delete_get);
router.post('/armor/:id/delete', armor_controller.armor_delete_post);

router.get('/armor/:id/update', armor_controller.armor_update_get);
router.post('/armor/:id/update', armor_controller.armor_update_post);

router.get('/armor/:id', armor_controller.armor_detail);

router.get('/armors', armor_controller.armor_list);

// Weapon Controllers

router.get('/weapon/create', weapon_controller.weapon_create_get);
router.post('/weapon/create', weapon_controller.weapon_create_post);

router.get('/weapon/:id/delete', weapon_controller.weapon_delete_get);
router.post('/weapon/:id/delete', weapon_controller.weapon_delete_post);

router.get('/weapon/:id/update', weapon_controller.weapon_update_get);
router.post('/weapon/:id/update', weapon_controller.weapon_update_post);

router.get('/weapon/:id', weapon_controller.weapon_detail);

router.get('/weapons', weapon_controller.weapon_list);

module.exports = router;