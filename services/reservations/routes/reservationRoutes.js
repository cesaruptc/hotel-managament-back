const express = require('express');
const { getReservations, createReservation, updateReservation, deleteReservation } = require('../controllers/reservationController');
const authenticate = require('../../../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getReservations);
router.post('/', authenticate, createReservation);
router.put('/:id', authenticate, updateReservation);
router.delete('/:id', authenticate, deleteReservation);

module.exports = router;
