var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: { type: String, required: true, maxlength: 40 },
  description: { type: String, required: true },
  stock: { type: Number, required: true, min: [0, 'You can not have negative stock idiot!'] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

// Virtual for Item's URL
ItemSchema.virtual('url').get(function () {
  return '/fridge/item/' + this._id;
});

//Export model
module.exports = mongoose.model('Item', ItemSchema);
