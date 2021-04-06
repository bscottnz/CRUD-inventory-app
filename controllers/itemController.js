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
  // res.send('NOT IMPLEMENTED: Item delete GET');
  Item.findById(req.params.id).exec((err, results) => {
    if (err) {
      return next(err);
    }
    if (results == null) {
      res.redirect('/fridge');
    }

    res.render('itemDelete', { item: results });
  });
};

// handle item delete on POST
exports.item_delete_post = (req, res) => {
  // res.send('NOT IMPLEMENTED: Item delete POST');

  Item.findById(req.body.itemid)
    .populate('category')
    .exec((err, results) => {
      const URL = results.category.url;
      // this should be refactored so that it is not nesting callbacks. maybe use async waterfall
      Item.findByIdAndRemove(req.body.itemid, function deleteItem(err, doc) {
        if (err) {
          return next(err);
        }
        res.redirect(URL);
      });
    });
};

// display item update form on GET
exports.item_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Item update GET');
};

// handle item update on POST
exports.item_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Item update POST');
};
