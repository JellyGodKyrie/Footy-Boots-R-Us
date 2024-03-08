const express = require('express');
const router = express.Router();
const bootsCtrl = require('../../controllers/api/boots');

// GET /api/boots
router.get('/', bootsCtrl.index);
// GET /api/boots/:id
router.get('/:id', bootsCtrl.show);

module.exports = router;