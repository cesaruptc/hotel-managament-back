const express = require('express');
const { getHotels, createHotel, updateHotel, deleteHotel, getHotelById} = require('../controllers/hotelController');
const authenticate = require('../../../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticate, createHotel);
router.put('/update/:id', authenticate, updateHotel);
router.delete('/delete/:id', authenticate, deleteHotel);

router.get('/', getHotels)
router.get('/:id', getHotelById)

module.exports = router;
