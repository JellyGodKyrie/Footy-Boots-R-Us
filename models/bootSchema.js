const boot = require('./boot');

const Schema = require('mongoose').Schema;

const bootSchema = new Schema ({
    name: { required: true, type: String },
    brand: { required: true, type: String },
    price: { required: true, type: Number, default: 0},
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
}, {
    timestamps: true
})

module.exports = bootSchema;