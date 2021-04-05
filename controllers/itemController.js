const Item = require('../models/item');

const async = require('async');
const { body, validationResult } = require('express-validator');

// display list of all items
exports.item_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Item List.');
};

// display detail page for a specific item
exports.item_detail = (req, res) => {
  // res.send('NOT IMPLEMENTED: Item Detail - ' + req.params.id);
  Item.findById(req.params.id)
    .populate('category')
    .exec((err, item) => {
      if (err) {
        return next(err);
      }
      // res.send(`Item: ${item.name} \n Description: ${item.description}`);
      res.render('itemDetail', { item });
    });
};

// display item create form on GET
exports.item_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item Create GET');
};

// handle item create on POST
exports.item_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item Create POST');
};

// display item delete form on GET
exports.item_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item delete GET');
};

// handle item delete on POST
exports.item_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item delete POST');
};

// display item update form on GET
exports.item_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item update GET');
};

// handle item update on POST
exports.item_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item update POST');
};
