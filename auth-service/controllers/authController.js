const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret, expiresIn } = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hasVoted = false;

    // Check if the email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      hasVoted,
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });

    // const isOk = user.isOk;

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // if (!isOk) {
    //   return res.status(400).json({ message: 'You are not allowed to login' });
    // }

    // Generate and send a JWT token
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn });

    res.json({ message: 'Login successful', token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error when Login' });
  }
};

exports.vertifyHasVoted = async (req, res) => {
  try {
    const { email } = req.query; // Note: using req.query to get email parameter from query string

    const user = await User.findOne({ email: email }); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hasVoted = user.hasVoted;

    res.json({ hasVoted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error + ' Server error when vertifyHasVoted' });
  }
}

exports.updateHasVoted = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hasVoted = true;

    // Update using await instead of callback
    await User.updateOne({ email: email }, { hasVoted: hasVoted });

    // You may want to send a response after updating
    res.status(200).json({ message: 'Successfully updated voting status' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error + ' Server error when updateHasVoted' });
  }
}
