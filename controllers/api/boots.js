const Boot = require('../../models/boot');

module.exports = {
  index,
  show
};

async function index(req, res) {
  try{
    const boots = await Boot.find({}).sort('name').populate('category').exec();
    // re-sort based upon the sortOrder of the categories
    boots.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    res.status(200).json(boots);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

async function show(req, res) {
  try{
    const boot = await Boot.findById(req.params.id);
    res.status(200).json(boot);
  }catch(e){
    res.status(400).json({ msg: e.message });
  } 
}