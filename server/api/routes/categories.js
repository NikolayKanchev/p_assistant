const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verify-token');
const cathegories = require('../controllers/categories');


router.post('/', verifyToken, cathegories.add);
router.post('/all', verifyToken, cathegories.get_all);
router.get('/:categoryId', verifyToken, cathegories.get_one);
router.patch('/:categoryId', verifyToken, cathegories.update);
router.delete('/:categoryId', cathegories.delete);

module.exports = router;