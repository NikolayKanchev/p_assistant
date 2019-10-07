const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const verifyToken = require('../middleware/verify-token');

router.post('/signup', users.signup);
router.post('/login', users.login);
router.post('/resetPass', users.resetPass);
router.post('/updatePass', verifyToken, users.updatePass);
router.delete("/:userId", verifyToken, users.delete_one);

module.exports = router;