const jwt = require('jsonwebtoken');
const supabase = require('../../../config/supabase');

exports.getReservations = async (req, res) => {
    const userId = req.user.user_id;
    console.log(userId)
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .eq('user_id', userId);

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createReservation = async (req, res) => {
    //const userId = req.user.id;

    const { user_id, hotel_id, check_in_date, check_out_date } = req.body;

    try {
        const { data, error } = await supabase.from('reservations').insert({
            user_id,
            hotel_id,
            check_in_date,
            check_out_date
        }).select().single();
        console.log("data: ", data)
        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({ message: 'Reservation created successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateReservation = async (req, res) => {
    const reservationId = req.params.id;
    const userId = req.user.id;
    const { hotel_id, check_in_date, check_out_date } = req.body;

    try {
        const { data, error } = await supabase
            .from('reservations')
            .update({
                hotel_id,
                check_in_date,
                check_out_date
            })
            .eq('id', reservationId)
            .eq('user_id', userId)
            .select()
            .single();

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ message: 'Reservation updated successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteReservation = async (req, res) => {
    const reservationId = req.params.id;
    const userId = req.user.id;

    try {
        const { data, error } = await supabase
            .from('reservations')
            .delete()
            .eq('id', reservationId)
            .eq('user_id', userId);

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ message: 'Reservation cancelled successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
