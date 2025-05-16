import portfolioModel, { getPortfolioById } from '../models/portfolioModel.js';
import stockModel, { createStockData } from '../models/stockModel.js'
import { Stock_Data } from '../models/stockObject.js';
import transactionService from '../models/transaction.js'; // Assuming transaction service file is at this path
import { getAvailability } from '../utils/controller-utils.js';
import axios from "axios";

const API_KEY = '';
const tickersList = await getAllStockData();

/**
 * Retrieves the portfolio for a specified user by aggregating their buy and sell transactions.
 *
 * @function getPortfolioUsername
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.username - The username of the player whose portfolio is being retrieved
 * @param {Object} res - Express response object
 * @returns {void} Returns a JSON response containing the user's aggregated portfolio data or an error message
 */
export const getPortfolioUsername = async (req, res) => {
  const { username } = req.params; // Get username from the request params

  try {
    // Fetch all transactions for the given user
    const transactions = await transactionService.findTransactions({ playerId: username }); // Query by playerId

    console.log("Transactions: ", transactions); // Add this line to check the data

    // If no transactions are found, send a 404 response
    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found for this user' });
    }

    /**
     * Aggregates data to form the user's portfolio by iterating over each transaction.
     * @typedef {Object} Portfolio
     * @property {number} quantity - Total quantity of stock owned
     * @property {number} totalInvested - Total amount invested in the stock
     * @property {number} totalSold - Total amount received from selling the stock
     */
    const portfolio = transactions.reduce((acc, transaction) => {
      const { stock, type, amount, totalInvested, totalSold } = transaction; // Include totalInvested and totalSold in destructuring

      // Initialize stock entry if not already present
      if (!acc[stock]) {
        acc[stock] = { quantity: 0, totalInvested: 0, totalSold: 0 };
      }

      // Update portfolio based on transaction type
      if (type === 'buy') {
        acc[stock].quantity += amount; // Increase quantity for buy transactions
        acc[stock].totalInvested += totalInvested; // Sum totalInvested for buy transactions
      } else if (type === 'sell') {
        acc[stock].quantity -= amount; // Decrease quantity for sell transactions
        acc[stock].totalSold += totalSold; // Sum totalSold for sell transactions
      }

      return acc; // Return accumulated portfolio
    }, {});

    // Return the aggregated portfolio data as a JSON response
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
};

export const viewPortfolio = async (req, res) => {
  var player = req.session.player;
  var names = "";
  try {
    names = player.name + " " + player.lastName;
    var portfolioID = req.params.portfolioId;
    var portfolio = await portfolioModel.getPortfolioById(portfolioID);
    var availability = getAvailability(portfolio.createdAt, portfolio.timeLimit);
    var stocks = await stockModel.getStocks(portfolioID);
    var past_stocks = await stockModel.getStocks(portfolioID, false);
    res.render('portfolio', {names: names, portfolio: portfolio, availability: availability, stocks: stocks, past_stocks: past_stocks});
  } catch (error){
    res.redirect('/player/login');
  }
};


export const buyStocksView = async (req, res) => {
  var portfolioId = req.query.portfolioId;
  var portfolio = await getPortfolioById(portfolioId);
  try{
    var username = req.session.player.username;
    var stock_data = await getAllStockData();
    if (stock_data.length < 10){
       await populateStockData();
       stock_data = await getAllStockData();
    }
    return res.render("buyStocks", {portfolio: portfolio, username: username, stockData: stock_data});
  } catch (error) {
    console.log(error);
    res.redirect('/player/login');
  }
};

export async function getAllStockData() {
  let result = await stockModel.getAllStockData();
  return result;
}

export async function populateStockData() {
  var stock_data = new Stock_Data(1, 'AAPL', 'Apple Inc.', 'Tech');
  await createStockData(stock_data);
  stock_data = new Stock_Data(2, 'GOOGL', 'Alphabet Inc.', 'Tech');
  await createStockData(stock_data);
  stock_data = new Stock_Data(3, 'AMZN', 'Amazon.com Inc.', 'E-commerce');
  await createStockData(stock_data);
  stock_data = new Stock_Data(4, 'TSLA', 'Tesla Inc.', 'Automotive');
  await createStockData(stock_data);
  stock_data = new Stock_Data(5, 'MSFT', 'Microsoft Corp.', 'Tech');
  await createStockData(stock_data);
  stock_data = new Stock_Data(6, 'META', 'Meta Platforms Inc.', 'Tech');
  await createStockData(stock_data);
  stock_data = new Stock_Data(7, 'NFLX', 'Netflix Inc.', 'Entertainment');
  await createStockData(stock_data);
  stock_data = new Stock_Data(8, 'NVDA', 'NVIDIA Corporation', 'Semiconductors');
  await createStockData(stock_data);
  stock_data = new Stock_Data(9, 'DIS', 'The Walt Disney Company', 'Entertainment');
  await createStockData(stock_data);
  stock_data = new Stock_Data(10, 'V', 'Visa Inc.', 'Financial');
  await createStockData(stock_data);
}

export const getHistoricalValue = async (req, res) => {
  var date = req.body.date;

  try {

    // Array to hold tickers with their current values
    const tickersWithCurrentValue = [];

    // Loop through each ticker to fetch its current value
    for (var ticker in tickersList) {
      var symbol = tickersList[ticker].symbol;
      const response = await axios.get("https://api.polygon.io/v1/open-close/" + symbol + "/" + date + "?adjusted=true&apiKey=" + API_KEY);
      tickersWithCurrentValue.push({
        symbol: symbol,
        currentValue: response.data.open,
      });
    }

    // Send the tickers with their current values to the frontend
    res.json(tickersWithCurrentValue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickers' });
  }
};
