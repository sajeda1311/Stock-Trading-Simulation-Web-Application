import express from 'express';
import { getPortfolioUsername, viewPortfolio, buyStocksView, getHistoricalValue } from '../controllers/portfolioController.js';


// Initialize an Express router
const router = express.Router();

// Define a route that listens for GET requests at /portfolio/:username
// It invokes the getPortfolio function from the portfolio controller
router.get('/portfolio/:username', getPortfolioUsername);

// Define a route that listens for GET requests at /portfolio/:id
// It invokes the viewPortfolio function from the portfolio controller
router.get('/view/:portfolioId', viewPortfolio);

// Define a route that listens for GET requests at /portfolio/buyStocksView
// It invokes the buyStocksView function from the portfolio controller
router.get('/buyStocks', buyStocksView);

// Define a route that listens for GET requests at /portfolio/getHistoricalValue
// It invokes the getHistoricalValue function from the portfolio controller
router.post('/getHistoricalValue', getHistoricalValue);

// Export the router so it can be used in other parts of the application
export default router;
