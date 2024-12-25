
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/user')
const bcrypt = require('bcrypt');

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://arjunrajputcsh23:2fqpBG7ihY5NTER6@cluster0.oy1mw.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})




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

    // Don't send password back to client
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email
    };

    res.json({ message: 'Success', user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: 'Server error occurred.' });
  }
}); 




app.post('/register', async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ status: 'email_exists', message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userModel.create({ ...req.body, password: hashedPassword });

    console.log("Response Sent: { status: 'success', message: 'User registered successfully.' }");
    res.status(201).json({ status: 'success', message: 'User registered successfully.' });
  } catch (err) {
    console.error("Error in /register:", err.message);
    res.status(500).json({ status: 'error', message: 'Internal server error.' });
  }
});




app.listen(3001, () => {
    console.log("Server is listening on port 3001...")
})