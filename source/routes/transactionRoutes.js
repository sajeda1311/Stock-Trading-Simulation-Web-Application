// routes/transactionRoutes.js
import express from 'express';
import { buyStock, sellStock } from '../controllers/transactionController.js';

const router = express.Router();


/**
 * @route POST /api/transactions/buy
 * @description Route to buy a stock
 * @body {Object} - The request body should contain details for buying a stock (e.g., stock symbol, quantity, price).
 * @returns {Object} - Response with the status of the purchase, such as success or failure.
 */
router.post('/buy', buyStock);   // Route to buy stock

/**
 * @route POST /api/transactions/sell
 * @description Route to sell a stock
 * @body {Object} - The request body should contain details for selling a stock (e.g., stock symbol, quantity, price).
 * @returns {Object} - Response with the status of the sale, such as success or failure.
 */
router.post('/sell', sellStock);  // Route to sell stock

// Exporting the router to be used in the main application

export default router;
