require('dotenv').config();
require('./database');

const Category = require('../models/category');
const Boot = require('../models/boot');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Firm Ground', sortOrder: 10},
    {name: 'Artificial Turf', sortOrder: 20},
    {name: 'Indoor', sortOrder: 30}
  ]);
/*
    name: { },
    brand: { },
    price: ,
    category: categories[i]
*/
  await Boot.deleteMany({});
  const Boots = await Boot.create([
    {name: 'Mercurial Vapor 15 Elite', brand: 'Nike', price: 259.99, category: categories[0]},
    {name: 'Superfly 9 Elite Dream Speed', brand: 'Nike', price: 294.99, category: categories[0]},
    {name: 'X CrazyFast Elite', brand: 'Adidas', price: 259.99, category: categories[0]},
    {name: 'Predator Elite', brand: 'Adidas', price: 259.99, category: categories[0]},
    {name: 'Future 7 Ultimate', brand: 'Puma', price: 239.99, category: categories[0]},
    {name: 'Phantom Luna II Elite', brand: 'Nike', price: 284.99, category: categories[1]},
    {name: 'Alpha Elite', brand: 'Mizuno', price: 239.99, category: categories[1]},
    {name: 'Accuracy+', brand: 'Adidas', price: 279.99, category: categories[1]},
    {name: 'Samba Classic Messi IN', brand: 'Adidas', price: 99.99, category: categories[2]},
    {name: 'React Gato IN', brand: 'Nike', price: 149.99, category: categories[2]}
  ]);

  console.log(boots)

  process.exit();

})();