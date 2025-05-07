const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({
            email,
            password: hashedPassword,
        });

        res.status(201).json({ success: true, message: 'User created successfully', response: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log("req body login: ", req.body)

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        } else {
            const payload = {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });

            res.status(200).json({ success: true, message: 'Login successful', token: token, response: user });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });

    }
}


const getUserDetails = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User details retrieved successfully', response: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}




module.exports = { userSignup, loginUser, getUserDetails };