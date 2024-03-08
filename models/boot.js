const mongoose = require('mongoose');
// Ensure the Category model is processed by Mongoose
require('./category');

const bootSchema = require('./bootSchema');

module.exports = mongoose.model('Boot', bootSchema);