const supabase = require('../../../config/supabase');

exports.register = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const { data, error } = await supabase.from('users').insert({
            email,
            password,
            role,
        });

        if (error) return res.status(400).json({ error: error.message });

        res.status(201).json({ message: 'User registered successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('id, email, role');

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
