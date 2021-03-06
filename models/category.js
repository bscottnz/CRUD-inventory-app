var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, required: true, maxlength: 20 },
  description: { type: String, required: true },
});

// Virtual for Category's URL
CategorySchema.virtual('url').get(function () {
  return '/fridge/category/' + this._id;
});

//Export model
module.exports = mongoose.model('Category', CategorySchema);
