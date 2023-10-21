import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import User, { findOne } from '../models/User';
import { secret, expiresIn } from '../config/jwt';

export async function register(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the email already exists
    const userExists = await findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate and send a JWT token
    const token = sign({ userId: user._id }, secret, { expiresIn });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
