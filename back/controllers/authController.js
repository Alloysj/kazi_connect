const User = require('../models/user');
const Session = require('../models/session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const simpleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Successful login - exclude password from response
    const { password: _, ...userWithoutPassword } = user.get({ plain: true });
    
    res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const validateSession = async (req, res) => {
  try {
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the session exists in the database
    const session = await Session.findOne({
      where: { session_token: token, user_id: decoded.id },
    });

    if (!session || new Date(session.expires_at) < new Date()) {
      return res.status(401).json({ error: 'Session expired or invalid' });
    }

    // Attach user info to the request object
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = { simpleLogin, validateSession };