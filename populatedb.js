console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var Armor = require('./models/armor');
var Weapon = require('./models/weapon');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

var armors = [];
var weapons = [];

function armorCreate(name, type, protection, price, cb) {
  armorDetail = {
    name: name,
    type: type,
    protection: protection,
    price: price,
  };

  var armor = new Armor(armorDetail);

  armor.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Armor: ' + armor);
    armors.push(armor);
    cb(null, armor);
  });
}

function weaponCreate(name, type, damage, price, cb) {
  weaponDetail = {
    name: name,
    type: type,
    damage: damage,
    price: price,
  };

  var weapon = new Weapon(weaponDetail);

  weapon.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Weapon: ' + weapon);
    weapons.push(weapon);
    cb(null, weapon);
  });
}

function createArmor(cb) {
  async.series(
    [
      function (callback) {
        armorCreate('Unholy Fortunes', 'Boots', 125, 320, callback);
      },
      function (callback) {
        armorCreate(
          'Fleeting Protection',
          'Chest',
          322,
          724,
          callback
        );
      },
      function (callback) {
        armorCreate('Conquered Hope', 'Heaume', 176, 512, callback);
      },
      function (callback) {
        armorCreate('Binding Might', 'Cape', 119, 419, callback);
      },
      function (callback) {
        armorCreate('Demon Chestplate', 'Chest', 361, 865, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createWeapon(cb) {
  async.parallel(
    [
      function (callback) {
        weaponCreate('Spellbinder', 'Staff', 57, 722, callback);
      },
      function (callback) {
        weaponCreate('NetherSong', 'Gun', 32, 457, callback);
      },
      function (callback) {
        weaponCreate(
          'Ghost, Destroyer of Redemption',
          'Sword',
          92,
          1037,
          callback
        );
      },
      function (callback) {
        weaponCreate(
          'Harmony, Urn of Cunning',
          'Staff',
          64,
          855,
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createArmor, createWeapon],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('Items created');
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
