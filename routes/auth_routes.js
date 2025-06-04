const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

// Register
const Register = async (req, res) => {
  const { User_name, email, password, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({ User_name, email, password: hash, role });

    // Fetch user again without password
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    });

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};


// Login
var login=async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '30m' });
  res.json({ token });
}

module.exports = {
  login,
  Register,
};
