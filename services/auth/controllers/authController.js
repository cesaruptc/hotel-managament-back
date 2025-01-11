const supabase = require('../../../config/supabase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.register = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from('users').insert({
            email,
            password: hashedPassword,
            role,
        }).select().single();

        if (error) return res.status(400).json({ error: error.message });

        const showData = {
            email: data.email,
            role: data.role
        };

        res.status(201).json({ message: 'User registered successfully', showData });
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

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el email existe en la base de datos
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single(); // Devuelve un único registro

        if (error || !user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const payload = {
            user_id: user.id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar el token al cliente
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
