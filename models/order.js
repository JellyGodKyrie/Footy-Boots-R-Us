const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bootSchema = require('./bootSchema');

const lineBootSchema = new Schema({
  qty: { type: Number, default: 1 },
  boot: bootSchema
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

lineBootSchema.virtual('extPrice').get(function() {
  // 'this' is bound to the lineBoot subdoc
  return this.qty * this.boot.price;
});

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  lineBoots: [lineBootSchema],
  isPaid: { type: Boolean, default: false }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

orderSchema.virtual('orderTotal').get(function() {
  return this.lineBoots.reduce((total, boot) => total + boot.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function() {
  return this.lineBoots.reduce((total, boot) => total + boot.qty, 0);
});

orderSchema.virtual('orderId').get(function() {
  return this.id.slice(-6).toUpperCase();
});

orderSchema.statics.getCart = function(userId) {
  // 'this' is the Order model
  return this.findOneAndUpdate(
    // query
    { user: userId, isPaid: false },
    // update
    { user: userId },
    // upsert option will create the doc if
    // it doesn't exist
    { upsert: true, new: true }
  );
};

orderSchema.methods.addbootToCart = async function(bootId) {
  const cart = this;
  // Check if boot already in cart
  const lineBoot = cart.lineBoots.find(lineBoot => lineBoot.boot._id.equals(bootId));
  if (lineBoot) {
    lineBoot.qty += 1;
  } else {
    const boot = await mongoose.model('Boot').findById(bootId);
    cart.lineBoots.push({ boot });
  }
  return cart.save();
};

// Instance method to set an boot's qty in the cart (will add boot if does not exist)
orderSchema.methods.setbootQty = function(bootId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line boot in the cart for the menu boot
  const lineBoot = cart.lineBoots.find(lineBoot => lineBoot.boot._id.equals(bootId));
  if (lineBoot && newQty <= 0) {
    // Calling remove, removes itself from the cart.lineBoots array
    lineBoot.remove();
  } else if (lineBoot) {
    // Set the new qty - positive value is assured thanks to prev if
    lineBoot.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);