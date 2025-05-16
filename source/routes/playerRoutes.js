import express from 'express';
import { login, register, logout, dashboard, adminDashboard, grantAdminRights, newGameView, createGame} from '../controllers/playerController.js';
import { getPlayerPortfoliosall } from '../models/portfolioModel.js'; 
import { getStocksByPortfolioId } from '../models/stockModel.js';
import {getTransactionsByPlayerId} from "../models/transactionModel.js"  
import { getPortfolioById } from '../models/portfolioModel.js';


// Initialize an Express router
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login', { username: "", message: "" });
})

router.get('/register', (req, res) => {
    res.render('register', { name: "", lastname: "", username: "", email: "", message: "" });
});

/**
 * @route POST /login
 * @description Route to login existing player/user
 * @body {Object} - The request body should contain details for login (username and password)
 * @returns {Object} - Response with the status of the login attempt
 */
router.post('/login', login);   // Route to login

/**
 * @route POST /register
 * @description Route to register new player/user
 * @body {Object} - The request body should contain details for registration (player data)
 * @returns {Object} - Response with the status of the registration attempt
 */
router.post('/register', register);   // Route to register


/**
 * @route GET /logout
 * @description Route logout the player
 */
router.get('/logout', logout);


/**
 * @route GET /dashboard
 * @description Dashboard for the player
 */
router.get('/dashboard', dashboard);

/**
 * @route GET /adminDashboard
 * @description Dashboard for the admin user
 */
router.get('/adminDashboard', adminDashboard);

/**
 * @route POST /switchAdmin/:user
 * @description Dashboard for the admin user
 */
router.post('/switchAdminRights/:user', grantAdminRights);

/**
 * @route GET /newGame
 * @description New game view for admins
 */
router.get('/newgame', newGameView);

/**
 * @route POST /newGame
 * @description New game post data to actually create the game
 */
router.post('/createGame', createGame);

/**
 * Fetch all player portfolios for the admin dashboard
 */
router.get('/all-portfolios', async (req, res) => {
    try {
        console.log("okay");
        let portfolios = await getPlayerPortfoliosall();  // Fetch all portfolios
        if (portfolios.length > 0) {
            res.json(portfolios);  // Send the array of portfolios as JSON
        } else {
            res.status(404).send({ error: "No portfolios found" });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch portfolios' });
    }
});

router.get('/player-investments/:portfolioId', async (req, res) => {
    const portfolioId = req.params.portfolioId;
    try {
        console.log("okay 2",portfolioId);
        // Fetch stocks for the portfolio (using portfolioId)
        const stocks = await getStocksByPortfolioId(portfolioId);
        const portfolio = await getPortfolioById(portfolioId);

        console.log("Portfolio : ",stocks);

        // Fetch transactions for the player (using playerId)
        const playerId = portfolio.owner; // You'll need to dynamically retrieve the playerId
        const transactions = await getTransactionsByPlayerId(playerId);

        console.log(transactions);

        // Render the page with the stocks and transactions data
        res.render('playerInvestments', {
            portfolio,
            portfolioId, // Pass portfolioId to use in the EJS page
            stocks,
            transactions
        });
    } catch (error) {
        console.error('Error fetching investments:', error);
        res.status(500).send('Error fetching investments');
    }
});

// Export the router so it can be used in other parts of the application
export default router;
