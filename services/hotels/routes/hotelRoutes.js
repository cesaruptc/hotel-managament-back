const express = require('express');
const { getHotels, createHotel } = require('../controllers/hotelController');

const router = express.Router();

router.get('/', getHotels);
router.post('/', createHotel);

module.exports = router;
