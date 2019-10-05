const express = require('express');
const router = express.Router();
const upload = require('../controllers/uploadFiles').upload;
const verifyToken = require('../middleware/verify-token');
const items = require('../controllers/items');

router.get('/', verifyToken, items.get_all);
router.post('/', verifyToken, upload.single('img'), items.add);
router.get('/:itemId', verifyToken, items.get_one);
router.patch('/:itemId', verifyToken, items.update);
router.delete('/:itemId', verifyToken, items.delete);

module.exports = router;