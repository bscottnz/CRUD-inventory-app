#! /usr/bin/env node

console.log(
  'This script populates some test categories and items to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
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
var Item = require('./models/item');
var Category = require('./models/category');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var items = [];
var categories = [];

function itemCreate(name, description, category, stock, cb) {
  itemdetail = { name, description, category, stock };

  var item = new Item(itemdetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, description, cb) {
  var category = new Category({ name, description });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category);
    cb(null, category);
  });
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate('Bread', 'Plain bread. Nothing fancy here.', categories[1], 1, callback);
      },
      function (callback) {
        itemCreate(
          'Milk',
          "The finest milk from Mr Jimmy's country farms.",
          categories[2],
          2,
          callback
        );
      },
      function (callback) {
        itemCreate('Chicken Breast', 'Juicy chicken. High in protein.', categories[0], 3, callback);
      },
      function (callback) {
        itemCreate(
          'Steak',
          'Juicy scotch fillet steak. For special occasions.',
          categories[0],
          2,
          callback
        );
      },
      function (callback) {
        itemCreate('Eggs', 'They are eggs. Fom chickens.', categories[5], 17, callback);
      },
      function (callback) {
        itemCreate(
          'Tuatara Hazy Pale Ale',
          "Beer of the week. It's good",
          categories[3],
          3,
          callback
        );
      },
      function (callback) {
        itemCreate('Spinach', "It's green and its good for you.", categories[4], 1, callback);
      },
      function (callback) {
        itemCreate(
          'Cheese',
          'Goes with anything. A perfect lazy snack.',
          categories[2],
          1,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createCategories(cb) {
  async.parallel(
    [
      function (callback) {
        categoryCreate('Meat', 'Delicious and nutricious, unless you are vegetarian.', callback);
      },
      function (callback) {
        categoryCreate('Grains', 'Major ingredient in bread.', callback);
      },
      function (callback) {
        categoryCreate('Dairy', 'Delicious and nutricious, unless you are vegan.', callback);
      },
      function (callback) {
        categoryCreate(
          'Alcohol',
          'For when you need to unwind or drown your sorrows. Best enjoyed in excess.',
          callback
        );
      },
      function (callback) {
        categoryCreate(
          'Vegetable',
          'It grows in your garden, but not very tasty. Good for you atleast.',
          callback
        );
      },
      function (callback) {
        categoryCreate('Miscellaneous', 'For all other items.', callback);
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    } else {
      console.log('ItemInstances: ' + items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
