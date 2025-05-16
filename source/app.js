import express, { json, urlencoded } from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import transactionRoutes from './routes/transactionRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import playerRoutes from './routes/playerRoutes.js'

import axios from 'axios';

// Define __dirname in an ES module environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.get('/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css'); // Explicitly set MIME type
    res.sendFile(path.join(__dirname, 'public', 'styles.css'));
});

app.get('/script.js', (req, res) => {
    res.setHeader('Content-Type', 'text/html'); // Explicitly set MIME type
    res.sendFile(path.join(__dirname, 'public', 'script.js'));
});

// Set up session management
/**
 * Sets up session management for the Express app.
 *
 * Configures the session middleware with options for session security and expiration.
 *
 * @function
 * @name app.use
 * @param {Object} sessionConfig - The configuration object for session management.
 * @param {string} sessionConfig.secret - Secret key used to sign the session ID cookie.
 * @param {boolean} sessionConfig.resave - Determines if the session should be saved on each request,
 * set to false for efficiency.
 * @param {boolean} sessionConfig.saveUninitialized - Determines if uninitialized sessions should be saved,
 * set to false to prevent saving empty sessions.
 * @param {Object} sessionConfig.cookie - Configures the session cookie.
 * @param {boolean} sessionConfig.cookie.secure - When true, the cookie is only set over HTTPS.
 * Must be set to true in production with HTTPS.
 * @param {number} sessionConfig.cookie.maxAge - The maximum age of the session in milliseconds.
 * Session expires after 30 minutes (30 * 60 * 1000 ms).
 */
app.use(session({
    secret: 'vaibhav@2510', // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        maxAge: 30 * 60 * 1000 // ideal Session expires after 30 minutes (30 * 60 * 1000 ms)
    }
}));

/**
 * Middleware for parsing JSON and URL-encoded data.
 */
app.use(express.json());
app.use(express.urlencoded({extended: true}));//incoming objects are strings or arrays

// Static files
// app.use(express.static(path.join(process.cwd(), 'public')));

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017';
const client = new MongoClient(mongoURI);
let db;

/**
 * Connects to the MongoDB database.
 * @returns {Promise<void>} - A promise that resolves when the database connection is successful.
 */
async function connectDB() {
  try {
    await client.connect();
    db = client.db('SoftProj');
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

// Set up EJS for rendering views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public')); // Make sure this path is correct

// Use the transaction routes
app.use('/api/transactions', transactionRoutes);

// Use the portfolio routes
app.use('/portfolio', portfolioRoutes);

// Use the palyer routes
app.use('/player', playerRoutes);

/**
 * Route to render today's stock tickers.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/tickers', (req, res) => {
    res.render('tickers'); // Render the tickers EJS page
});


/**
 * Route for buying/selling stocks.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/buy-sell', (req, res) => {
    console.log(req.session.username);
    res.render('buy-sell', { username: req.session.username });
});

/**
 * Route for showing the user's portfolio.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/portfolio', (req, res) => {
    res.render('portfolio', { username: req.session.username });
});

// API Key for fetching stock tickers from Polygon.io API
const API_KEY = '';

/**
 * Endpoint to fetch stock tickers and their current values.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/api/tickers', async (req, res) => {
  try {
    // Static list of tickers
    const tickersList = [
      { symbol: 'AAPL', name: 'Apple Inc.', type: 'Tech' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'Tech' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'E-commerce' },
      { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Automotive' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', type: 'Tech' },
      { symbol: 'META', name: 'Meta Platforms Inc.', type: 'Tech' },
      { symbol: 'NFLX', name: 'Netflix Inc.', type: 'Entertainment' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Semiconductors' },
      { symbol: 'DIS', name: 'The Walt Disney Company', type: 'Entertainment' },
      { symbol: 'V', name: 'Visa Inc.', type: 'Financial' }
    ];

    // Array to hold tickers with their current values
    const tickersWithCurrentValue = [];

    // Loop through each ticker to fetch its current value
    for (let ticker of tickersList) {
      const currentValueResponse = await axios.get(`https://api.polygon.io/v2/last/trade/${ticker.symbol}`, {
        params: { apiKey: API_KEY },
      });

      const currentValue = currentValueResponse.data.results?.p || null; // Extract price if available

      tickersWithCurrentValue.push({
        symbol: ticker.symbol,
        name: ticker.name,
        type: ticker.type,
        currentValue: currentValue,
      });
    }

    // Send the tickers with their current values to the frontend
    res.json(tickersWithCurrentValue);
  } catch (error) {
    console.error('Error fetching tickers:', error);
    res.status(500).json({ error: 'Failed to fetch tickers' });
  }
});

/**
 * Redirect to login page by default.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
app.get('/', (req, res) => {
  res.redirect('/player/login');
  //res.sendFile(path.join(__dirname, 'public', 'login.ejs'));
});

export default app;
