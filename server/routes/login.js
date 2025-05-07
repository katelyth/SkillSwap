const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Received login credentials:', { email, password }); // Log incoming data

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ token });
  } catch (err) {
    console.error('Server error:', err); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

