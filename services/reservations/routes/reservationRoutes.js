const express = require('express');
const { getReservations, createReservation } = require('../controllers/reservationController');

const router = express.Router();

router.get('/', getReservations);
router.post('/', createReservation);

module.exports = router;
