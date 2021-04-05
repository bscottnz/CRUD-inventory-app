const express = require('express');
const router = express.Router();

// require controller modules
const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

// item routes

// GET request for creating an item
router.get('/item/create', item_controller.item_create_get);

// POST request for creating an item
router.post('/item/create', item_controller.item_create_post);

// GET request to delete item
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete item
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update item
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update item
router.post('/item/:id/update', item_controller.item_update_post);

// GET request for one item
router.get('/item/:id', item_controller.item_detail);

// GET request for list of all items
router.get('/items', item_controller.item_list);

// category routes

// GET request for creating a category
router.get('/category/create', category_controller.category_create_get);

// POST request for creating a category
router.post('/category/create', category_controller.category_create_post);

// GET request to delete category
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete category
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update category
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update category
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one category
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all categories / home page
router.get('/', category_controller.category_list);

module.exports = router;
