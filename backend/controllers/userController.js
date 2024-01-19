const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

exports.register = async (req, res) => {
  try {
    // Check existing user
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create new User
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const newUser = await user.save();
    res.status(201).send({ userId: newUser._id });
  } catch (error) {
    res.status(500).send('Error registering new user');
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.send({ token });
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};
