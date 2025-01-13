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

        if (data.length === 0) {
            return res.status(404).json({ message: "No reservations found for this user"})
        }

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createReservation = async (req, res) => {
    //const userId = req.user.id;

    const { user_id, hotel_id, check_in_date, check_out_date } = req.body;

    const today = new Date();
    const checkInDate = new Date(check_in_date);

    if (checkInDate <= today) {
        return res.status(400).json({ error: 'Check-in date must be later than today.' });
    }

    if (new Date(check_in_date) >= new Date(check_out_date)) {
        return res.status(400).json({ error: 'Check-out date must be later than check-in date'});
    }

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

    const today = new Date();
    const checkInDate = new Date(check_in_date);

    if (checkInDate <= today) {
        return res.status(400).json({ error: 'Check-in date must be later than today.' });
    }

    if (new Date(check_in_date) >= new Date(check_out_date)) {
        return res.status(400).json({ error: 'Check-out date must be later than check-in date'});
    }

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
    const userId = req.user.user_id;

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
