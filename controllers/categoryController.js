const Category = require('../models/category');
const Item = require('../models/item');
const unescape = require('../middleware/unescape-middleware');

const async = require('async');
const { body, validationResult } = require('express-validator');

// display list of all categories
exports.category_list = (req, res) => {
  Category.find({}, 'name').exec((err, list_categories) => {
    if (err) {
      return next(err);
    }
    // console.log(list_categories);
    // res.send('NOT IMPLEMENTED: Category List.');
    res.render('index', { category_list: list_categories });
  });
};

// display detail page for a specific category
exports.category_detail = (req, res) => {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      item: function (callback) {
        Item.find({ category: req.params.id }).populate('category').exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
      }
      // successful, so render
      // res.send(
      //   `Category: ${results.category.name}. Items: ${results.item.map((item) => item.name)}`
      // );
      res.render('categoryDetail', { results: results });
    }
  );
};

// display category create form on GET
exports.category_create_get = (req, res) => {
  res.render('categoryCreate');
};

// handle category create on POST
exports.category_create_post = [
  // res.send('NOT IMPLEMENTED: Category Create POST');

  // validate and sanatize name field
  body('name', 'Category name required.').trim().isLength({ min: 1 }).escape(),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Category description required.'),
  unescape('&#x27;', "'"),

  // process request after validation and sanitization
  (req, res, next) => {
    // extract the validation errors from the request
    const errors = validationResult(req);

    // create a category object with escaped and trimmed data
    const category = new Category({ name: req.body.name, description: req.body.description });

    if (!errors.isEmpty()) {
      // there are errors, render the form again with the sanatized values and error messages
      res.render('categoryCreate', { category: category, errors: errors.array() });
      return;
    } else {
      // data from form is valid
      // check to make sure category with same name doesn't already exist
      Category.findOne({ name: req.body.name }).exec((err, found_category) => {
        if (err) {
          return next(err);
        }

        if (found_category) {
          // category exists, redirect to it's detail page
          res.redirect(found_category.url);
        } else {
          category.save((err) => {
            if (err) {
              return next(err);
            }
            // category saved, redirect to new category detail page
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

// display category delete form on GET
exports.category_delete_get = (req, res) => {
  // res.send('NOT IMPLEMENTED: Category delete GET');
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_items: function (callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // no category
        res.redirect('/fridge');
      }
      // successful so render
      res.render('categoryDelete', {
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};

// handle category delete on POST
exports.category_delete_post = (req, res) => {
  // res.send('NOT IMPLEMENTED: Category delete POST');
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.body.categoryid).exec(callback);
      },
      category_items: function (callback) {
        Item.find({ category: req.body.categoryid }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // success
      if (results.category_items.length > 0) {
        // category has items, render in same way as for GET route
        res.render('categoryDelete', {
          category: results.category,
          category_items: results.category_items,
        });
      } else {
        // category has no items, delete object and redirect to home page
        Category.findByIdAndRemove(req.body.categoryid, function deleteCategory(err) {
          if (err) {
            return next(err);
          }
          //success - got to home page
          res.redirect('/');
        });
      }
    }
  );
};

// display category update form on GET
exports.category_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Category update GET');
};

// handle category update on POST
exports.category_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Category update POST');
};
