const User = require('../models/user');
const jwt = require('jsonwebtoken');
const session = require('../models/session');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
  try {
    // Destructure all expected fields.
    // Even if a role is passed, override it to 'viewer'
    const { username, email, password, phone, occupation } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,       // Save the phone number
      occupation   
    });
    
    res.status(201).json({
      id: user.user_id,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Login user and generate JWt

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      console.log('Invalid password for:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a new token (JWT)
    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Hash the token before storing it
    const hashedToken = await bcrypt.hash(token, 10);

    // Update the user's currentToken with the hashed token
    await user.update({ currentToken: hashedToken });

    // Adjust the expiry time to your timezone (+3 hours)
    const expiresAt = new Date(Date.now() + 3600000); // Add 1 hour
    expiresAt.setHours(expiresAt.getHours() + 3);

    // Store the session in the database
    await session.create({
      user_id: user.user_id,
      session_token: hashedToken,
      expires_at: expiresAt 
    });


    // Set the token cookie with a global path.
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
      path: '/',    
    });

    console.log('Successful login for:', email);
    res.json({ 
      message: 'Login successful',
      user: { id: user.user_id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await User.create({ username, email, password, role });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update({ username, email, role });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const validateSession = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({
      id: user.user_id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, getUserById, validateSession , createUser, updateUser, deleteUser, registerUser, loginUser };