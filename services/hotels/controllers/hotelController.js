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
        const { data, error } = await supabase.from('hotels').insert({ name, location }).select().single();

        if (error) return res.status(400).json({ error: error.message });

        const showData = {
            name: data.name,
            location: data.location
        };

        res.status(201).json({ message: 'Hotel created successfully', showData });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateHotel = async (req, res) => {
    const { id } = req.params;
    const { name, location } = req.body;

    // Verificar que el usuario sea administrador (comprobar rol 'admin')
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Only admin can update a hotel.' });
    }

    try {
        const { data, error } = await supabase
            .from('hotels')
            .update({ name, location })
            .eq('id', id)
            .select()
            .single();

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ message: 'Hotel updated successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Eliminar un hotel
exports.deleteHotel = async (req, res) => {
    const { id } = req.params;

    // Verificar que el usuario sea administrador (comprobar rol 'admin')
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access denied. Only admin can delete a hotel.' });
    }

    try {
        const { data, error } = await supabase
            .from('hotels')
            .delete()
            .eq('id', id);

        if (error) return res.status(400).json({ error: error.message });

        res.status(200).json({ message: 'Hotel deleted successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
