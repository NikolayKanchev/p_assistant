const express = require('express');
const router = express.Router();
const upload = require('../controllers/uploadFiles').upload;
const verifyToken = require('../middleware/verify-token');
const children = require('../controllers/children');

router.get('/', verifyToken, children.get_all);
router.post('/', verifyToken, upload.single('img'), children.add);
router.get('/:childId', verifyToken, children.get_one);
router.patch('/:childId', verifyToken, children.update);
router.delete('/:childId', verifyToken, children.delete);

module.exports = router;