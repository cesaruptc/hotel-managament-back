const supabase = require('../../../config/supabase');

exports.getReservations = async (req, res) => {
    try {
        const { data, error } = await supabase.from('reservations').select('*');

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createReservation = async (req, res) => {
    const { user_id, hotel_id, check_in_date, check_out_date } = req.body;

    try {
        const { data, error } = await supabase.from('reservations').insert({
            user_id,
            hotel_id,
            check_in_date,
            check_out_date,
        });

        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({ message: 'Reservation created successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
