const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

exports.getMe = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).send('The user does not exist.');
    }
    return res.status(200).send({ user: user });
  }
  catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;  
    const user = await User.findById(userId).select('-password');  
    if (!user) {
      return res.status(404).send('The user does not exist.');
    }
    return res.status(200).send({ user: user });  
  } catch (error) {
    res.status(500).send('Error finding user');
  }
};

exports.register = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // one hour
      res.send({ name: user.name }); // Fix: Pass an object with the property 'name'
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in user');
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200); 
};
