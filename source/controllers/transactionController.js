import { Double, MongoClient, ObjectId } from 'mongodb';
import axios from 'axios';
import stockModel from '../models/stockModel.js';
import { Stock } from '../models/stockObject.js';
import { getPortfolioById, updateFunds } from '../models/portfolioModel.js';

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'SoftProj';
const collectionName = 'transactions';

/**
 * Connects to the MongoDB database and retrieves the specified collection.
 *
 * @async
 * @function connectToDB
 * @returns {Promise<Object>} Object containing MongoDB client and collection
 */
async function connectToDB() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return { client, collection };
}

/**
 * Retrieves the current holdings for a specific stock for a user.
 *
 * @async
 * @function getCurrentHoldings
 * @param {string} userId - The ID of the user
 * @param {string} stockSymbol - The stock symbol to check holdings for
 * @returns {Promise<number>} The net quantity of the stock currently held by the user
 */
async function getCurrentHoldings(userId, stockSymbol) {
  const { client, collection } = await connectToDB();
  try {
    const transactions = await collection
      .find({ playerId: userId, stock: stockSymbol })
      .toArray();

    const totalBought = transactions
      .filter(tx => tx.type === 'buy')
      .reduce((total, tx) => total + tx.amount, 0);

    const totalSold = transactions
      .filter(tx => tx.type === 'sell')
      .reduce((total, tx) => total + tx.amount, 0);

    return totalBought - totalSold;
  } finally {
    await client.close();
  }
}

/**
 * Buys stock for a user, creating a new transaction record and updating the user's total investment.
 *
 * @async
 * @function buyStock
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing stock transaction details
 * @param {string} req.body.userId - The ID of the user making the purchase
 * @param {string} req.body.stockSymbol - The symbol of the stock being purchased
 * @param {number} req.body.quantity - The quantity of stock to buy
 * @param {number} req.body.price - The price of each stock unit
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Returns a JSON response indicating success or error
 */
export const buyStock = async (req, res) => {
  var userId = "";
  try{
    userId = req.session.player.username;
  } catch(error){
    console.log(error);
  }
  var { portfolioID, stockSymbol, stockName, stockType, quantity, price } = req.body;  // price is passed from frontend

  if (!portfolioID || !userId || !stockSymbol || !stockName || !stockType || quantity == null || price == null) {
    return res.status(500).json({ message: 'userId, stockSymbol, quantity, and price are required' });
  }

  price = price.replace("$", "");
  price = parseFloat(price);

  var stock = new Stock(null, portfolioID, stockSymbol, stockName, stockType, quantity, price, new Date(), 0.0, true);
  var portfolio = await getPortfolioById(portfolioID);
  var availableFunds = portfolio.funds;
  const totalCost = price * quantity; // Calculate the total invested amount
  var newFunds = (Math.round( (portfolio.funds - totalCost) * 100 ) / 100).toFixed(2); // Avoid the pesky .0000000001 error
  
  if (availableFunds < totalCost){
    return res.status(500).json({ message: 'Not enough funds to make transaction' });
  }

  await createStock(stock);
  await updateFunds(portfolioID, parseFloat(newFunds));

  const { client, collection } = await connectToDB();
  try {
    const transaction = {
      playerId: userId,
      stock: stockSymbol,
      amount: quantity,
      totalInvested: totalCost, // Set totalInvested in the transaction
      type: 'buy',
      date: new Date(),
    };

    const result = await collection.insertOne(transaction);

    // Update the total invested in the user's record for that stock
    await collection.updateOne(
      { playerId: userId, stock: stockSymbol },
      { $set: { totalInvested: totalCost } },  // Increment the totalInvested only
      { upsert: true } // If the stock doesn't exist, it will insert it
    );
    res.status(200).json({ message: 'Stock purchased successfully', transaction: { ...transaction, insertedId: result.insertedId }, newFunds: newFunds });
  } finally {
    await client.close();
  }
};

/**
 * Sells stock for a user, creating a new transaction record and updating the user's total sales for that stock.
 *
 * @async
 * @function sellStock
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing stock transaction details
 * @param {string} req.body.userId - The ID of the user selling the stock
 * @param {string} req.body.stockSymbol - The symbol of the stock being sold
 * @param {number} req.body.quantity - The quantity of stock to sell
 * @param {number} req.body.price - The price of each stock unit
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Returns a JSON response indicating success or error
 */
export const sellStock = async (req, res) => {
  var userId = "";
  try{
    userId = req.session.player.username;
  } catch(error){
    console.log(error);
  }

  const stockId = req.body.stockId;  // price is passed from frontend
  var marketValue = req.body.marketValue;  // market value of stock

  if (!userId || !stockId || !marketValue ) {
    return res.status(500).json({ message: 'userId, stockId and marketValue are required' });
  }

  marketValue = marketValue.replace("$", "");
  marketValue = parseFloat(marketValue);

  var stock = await getStockById(stockId);
  var stockSymbol = stock.symbol;
  var quantity = stock.quantity;

  const currentHoldings = await getCurrentHoldings(userId, stockSymbol);
  if (currentHoldings < quantity) {
    return res.status(500).json({ message: 'Not enough stocks to sell' });
  }

  const totalSale = marketValue * quantity; // Calculate total sold amount

  const { client, collection } = await connectToDB();
  try {
    const transaction = {
      playerId: userId,
      stock: stockSymbol,
      amount: quantity,
      totalSold: totalSale, // Set totalSold in the transaction
      type: 'sell',
      date: new Date(),
    };

    const result = await collection.insertOne(transaction);

    // Update the total sold in the user's record for that stock
    await collection.updateOne(
      { playerId: userId, stock: stockSymbol },
      { $inc: { totalSold: totalSale } },
      { upsert: true } // If the stock doesn't exist, it will insert it
    );

    var portfolio = await getPortfolioById(stock.portfolio);
    var newFunds = (Math.round((portfolio.funds + totalSale) * 100 ) / 100).toFixed(2); // Avoid the pesky .0000000001 error
    await updateFunds(stock.portfolio, parseFloat(newFunds));
    await disableStock(stock.id.toString());
    await updateStockSoldAt(stock.id.toString(), parseFloat(marketValue)); // Pesky type conversion
    res.status(200).json({ message: 'Stock sold successfully', transaction: { ...transaction, insertedId: result.insertedId }, newFunds: newFunds, stockSold: stock, marketValue: marketValue });
  } finally {
    await client.close();
  }
};


export async function createStock(stock){
  let operationResult = await stockModel.createStock(stock);
  return operationResult;
}

export async function getStockById(stock){
  let operationResult = await stockModel.getStockById(stock);
  return operationResult;
}

export async function disableStock(stock){
  let operationResult = await stockModel.disableStock(stock);
  return operationResult;
}

export async function updateStockSoldAt(stock, value){
  let operationResult = await stockModel.updateSoldValue(stock, value);
  return operationResult;
}