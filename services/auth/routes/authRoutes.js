const express = require('express');
const { register, getUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.get('/users', getUsers);

module.exports = router;
