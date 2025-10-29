// Express just allows us to set up a server really quickly
// it's responsible for the app.post() function. Easy!
const express = require('express');

// This allows us to accept requests from our frontend
// which is on a different server.
const cors = require('cors');

// Extends Express and allows it to understand JSON
// that we will send from the frontend
const bodyParser = require('body-parser');

// MongoDB ODM for database operations
const mongoose = require('mongoose');

// Either use the default port, or 3000 if that's not set
const port = process.env.PORT || 3000;

// MongoDB connection string - use environment variable or default
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/greetingsdb';

// Our server will only accept requests from our frontend
// which (if running locally) has this URL:PORT
const corsOptions = { origin: '*' }; // Allow all origins for cloud deployment

// Set up our app object & tell it to accept JSON
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((err) => {
  console.log('MongoDB connection error:', err);
});

// Define a simple Greeting schema and model
const greetingSchema = new mongoose.Schema({
  name: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Greeting = mongoose.model('Greeting', greetingSchema);

// When the browser asks the server if it's okay to send
// a cross-origin request, this code says "yup"
app.options('*', cors(corsOptions));

// Health check endpoint
app.get('/health', cors(corsOptions), function (request, response) {
  response.json({ status: 'OK', message: 'Server is running' });
});

// Get all greetings from database
app.get('/greetings', cors(corsOptions), async function (request, response) {
  try {
    const greetings = await Greeting.find().sort({ timestamp: -1 }).limit(10);
    response.json({ greetings: greetings });
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch greetings' });
  }
});

// When the app receives a POST request (a request that's sending
// data), at the url '/hello' it will trigger this function
app.post('/hello', cors(corsOptions), async function (request, response) {
  // Extract the name from the { name: 'your name' } obj that's sent
  const name = request.body.name;
  
  const message = 'Hello, ' + name;

  // Save greeting to database
  try {
    const greeting = new Greeting({
      name: name,
      message: message
    });
    await greeting.save();
    console.log('Greeting saved to database:', name);
  } catch (error) {
    console.log('Error saving to database:', error);
  }

  // Send a JSON response, that contains the message (you could call
  // this 'message' anything, so long as the frontend knows what
  // it's labelled as)
  response.json({ message: message });
});

// Now we've specified the routes above, trigger the server to start
app.listen(port, () => console.log('Server listening on port', port));