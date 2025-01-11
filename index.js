const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./services/auth/routes/authRoutes');
const hotelRoutes = require('./services/hotels/routes/hotelRoutes');
const reservationRoutes = require('./services/reservations/routes/reservationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
