const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const { Groq } = require('groq-sdk')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

// MongoDB Connection
mongoose.connect('mongodb+srv://arjunrajputcsh23:2fqpBG7ihY5NTER6@cluster0.oy1mw.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err))

const systemPrompt = `You are Dhannu, a specialized financial advisor AI assistant. Your only focus is on providing accurate information about investments, markets, financial planning, and general finance topics.
Any question related to any other field or domain should not be answered and handled gracefully.

Guidelines for responses:

Content Guidelines:
- Provide clear, accurate financial information
- Use professional financial terminology appropriately
- Include relevant data and facts when necessary
- Clarify when advice is general in nature

Would you like to learn more about any of these <strong>investment options</strong>?"`;


// Updated formatting function to handle HTML and convert to markdown
function cleanMarkdownFormatting(text) {
  if (!text) return text;

  // Step 1: Handle markdown bold syntax properly
  let formattedText = text
    .replace(/\*\*([^:]+):\*\*/g, '**$1:**')  // Fix bold text with colons
    .replace(/([^:]+):\s*\*\*/g, '**$1:**')   // Fix bold text after colons
    .replace(/\*\*\s+/g, '**')                // Remove spaces after **
    .replace(/\s+\*\*/g, '**');               // Remove spaces before **

  // Step 2: Format section headers with proper spacing
  formattedText = formattedText
    .replace(/(Here are some key aspects of car loans:|Types of Car Loans:|Key Components of Car Loans:|Factors to Consider:|General Advice:)/g, '\n\n$1\n');

  // Step 3: Format numbered items
  formattedText = formattedText
    .replace(/(\d+\.)\s*/g, '\n$1 ');

  // Step 4: Clean up spacing around colons
  formattedText = formattedText
    .replace(/\s*:\s*/g, ': ');

  // Step 5: Ensure proper spacing between items and sections
  formattedText = formattedText
    .replace(/\n{3,}/g, '\n\n')
    .replace(/([.!?])\s*(\d+\.)/g, '$1\n$2');

  // Step 6: Format nested points
  formattedText = formattedText
    .replace(/(General Advice:.*?)\n(\d+\.)/g, '$1\n\n$2');

  // Step 7: Clean up extra whitespace
  formattedText = formattedText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');

  return formattedText;
}


// Updated chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid message format' });
    }

    const formattedMessages = messages.map(msg => ({
      role: msg.role || 'user',
      content: msg.content
    }));

    // Add updated system prompt
    formattedMessages.unshift({
      role: 'system',
      content: systemPrompt
    });

    const chatCompletion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 2048
    });

    let response = chatCompletion.choices[0]?.message?.content;
    if (response) {
      response = cleanMarkdownFormatting(response);
    }

    res.json({ content: response });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      address: user.address,
      createdAt: user.createdAt
    };

    res.json({ message: 'Success', user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: 'Server error occurred.' });
  }
}); 

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      gender,
      address: {
        street,
        city,
        state,
        zipCode
      } = {}
    } = req.body;

    if (!name || !email || !password || !phoneNumber || !dateOfBirth || !gender) {
      return res.status(400).json({
        status: 'error',
        message: 'All fields are required.'
      });
    }

    if (!street || !city || !state || !zipCode) {
      return res.status(400).json({
        status: 'error',
        message: 'All address fields are required.'
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'email_exists',
        message: 'Email already registered.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      address: {
        street,
        city,
        state,
        zipCode
      }
    });

    console.log("User registered successfully:", {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name
    });

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully.'
    });

  } catch (err) {
    console.error("Error in /register:", err);

    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data provided.',
        details: err.message
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
});

// Forgot password endpoint
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found.' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dhansetufinance@gmail.com',
        pass: 'ampzfpdefhiaawal'
      }
    });

    const mailOptions = {
      from: 'dhansetufinance@gmail.com',
      to: user.email,
      subject: 'Password Reset Link',
      html: `
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(45deg, #2193b0, rgb(140, 226, 246)); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; text-align: center;">Password Reset Request</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #eee;">
            <p style="margin-top: 0;">Hello,</p>
            <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:5173/reset-password/${resetToken}" 
                 style="background: linear-gradient(45deg, #2193b0, rgb(140, 226, 246)); 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 5px; 
                        display: inline-block;
                        font-weight: bold;">
                Reset Password
              </a>
            </div>
            
            <p style="margin-bottom: 0;">This link will expire in 1 hour for security reasons.</p>
            <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="background: #eee; padding: 10px; border-radius: 5px; font-size: 14px; word-break: break-all;">
              http://localhost:5173/reset-password/${resetToken}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            <p>This is an automated email. Please do not reply.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent.' });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error processing request.' });
  }
});

// Reset password endpoint
app.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset.' });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password.' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running correctly' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
}); 