const supabase = require('../../../config/supabase');

exports.getHotels = async (req, res) => {
    try {
        const { data, error } = await supabase.from('hotels').select('*');

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createHotel = async (req, res) => {
    const { name, location } = req.body;

    try {
        const { data, error } = await supabase.from('hotels').insert({ name, location });

        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({ message: 'Hotel created successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
