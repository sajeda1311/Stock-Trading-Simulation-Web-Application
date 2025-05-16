import { MongoClient } from 'mongodb';
import { buyStock, sellStock } from '../controllers/transactionController.js'; // Import your buyStock and sellStock methods
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import assert from 'assert';
import { before, suite, test, after } from 'node:test';

// Initialize Express and middleware
const app = express();
app.use(bodyParser.json());

// Routes for testing
/**
 * @route POST /api/transactions/buy
 * @description Route to handle buying a stock. The test case will call this route to simulate a stock purchase.
 * @param {Object} requestBody - The body of the request containing userId, stockSymbol, quantity, and price.
 * @returns {Object} response - The response contains a message about the success or failure of the purchase.
 */
app.post('/buy', buyStock);

/**
 * @route POST /api/transactions/sell
 * @description Route to handle selling a stock. The test case will call this route to simulate a stock sale.
 * @param {Object} requestBody - The body of the request containing userId, stockSymbol, quantity, and price.
 * @returns {Object} response - The response contains a message about the success or failure of the sale.
 */
app.post('/sell', sellStock);

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'SoftProj';
let client;
let db;
let collection;

// Setup and Teardown using node:test methods
suite('Stock Transactions Tests', () => {

  /**
   * @function before
   * @description Setup MongoDB connection and clean up the database before each test.
   */
  before(async () => {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    collection = db.collection('transactions');
    // Clean up the database before each test
    await collection.deleteMany({});
  });

  /**
   * @function after
   * @description Close the MongoDB connection after all tests.
   */
  after(async () => {
    await client.close();
  });

  /**
   * @test
   * @description Test case for buying stock
   * This test simulates a user buying stock and checks for a successful response.
   */
  test('should buy stock', async () => {
    const requestData = JSON.stringify({ userId: 'user123', stockSymbol: 'AAPL', quantity: 10, price: 150 });
    console.log('Request Data for Buy:', requestData); // Debugging statement

    const response = await new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: 'localhost', port: 3000, path: '/api/transactions/buy', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestData) } },
        (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            console.log('Buy Response Status:', res.statusCode); // Debugging statement
            console.log('Buy Response Body:', data); // Debugging statement
            resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
          });
        }
      );
      req.on('error', reject);
      req.write(requestData);
      req.end();
    });

    assert.strictEqual(response.statusCode, 201); // Expect success status code
    assert.strictEqual(response.body.message, 'Stock purchased successfully'); // Expect success message
  });

  /**
   * @test
   * @description Test case for selling stock
   * This test simulates a user selling stock and checks for a successful response.
   */
  test('should sell stock', async () => {
    const requestData = JSON.stringify({ userId: 'user123', stockSymbol: 'AAPL', quantity: 5, price: 155 });
    console.log('Request Data for Sell:', requestData); // Debugging statement

    // Pre-insert a stock purchase for the user
    await collection.insertOne({
      playerId: 'user123',
      stock: 'AAPL',
      amount: 10,
      totalInvested: 1500,
      type: 'buy',
      date: new Date(),
    });

    const response = await new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: 'localhost', port: 3000, path: '/api/transactions/sell', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestData) } },
        (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            console.log('Sell Response Status:', res.statusCode); // Debugging statement
            console.log('Sell Response Body:', data); // Debugging statement
            resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
          });
        }
      );
      req.on('error', reject);
      req.write(requestData);
      req.end();
    });

    assert.strictEqual(response.statusCode, 201); // Expect success status code
    assert.strictEqual(response.body.message, 'Stock sold successfully'); // Expect success message
  });

  /**
   * @test
   * @description Test case for attempting to sell more stock than owned.
   * This test ensures that users cannot sell more stock than they own.
   */
  test('should return an error when trying to sell more stock than owned', async () => {
    const requestData = JSON.stringify({ userId: 'user123', stockSymbol: 'AAPL', quantity: 99, price: 155 });
    console.log('Request Data for Sell (Exceeding Holdings):', requestData); // Debugging statement

    const response = await new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: 'localhost', port: 3000, path: '/api/transactions/sell', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestData) } },
        (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            console.log('Sell Response Status (Exceeding Holdings):', res.statusCode); // Debugging statement
            console.log('Sell Response Body (Exceeding Holdings):', data); // Debugging statement
            resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
          });
        }
      );
      req.on('error', reject);
      req.write(requestData);
      req.end();
    });

    // Add logging to check what the response status code and body are
    console.log('Received Response:', response);

    // Ensure the response status code is 400
    try {
      assert.strictEqual(response.statusCode, 400, 'Expected status code to be 400 when attempting to sell more stock than owned');
    } catch (error) {
      console.error('Test Failed - Expected 400, but received:', response.statusCode);
      console.error('Response Body:', response.body);
      throw error;
    }

    // Check if the response message matches the expected error
    assert.strictEqual(response.body.message, 'Not enough stocks to sell', 'Error message should indicate insufficient stock');
  });

  /**
   * @test
   * @description Test case for invalid input in the buyStock route.
   * This test checks the behavior when required fields are missing in the buy request.
   */
  test('should return error if required fields are missing in buy request', async () => {
    const requestData = JSON.stringify({ stockSymbol: 'AAPL', quantity: 10 }); // Missing userId and price
    console.log('Request Data for Buy (Missing Fields):', requestData); // Debugging statement

    const response = await new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: 'localhost', port: 3000, path: '/api/transactions/buy', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestData) } },
        (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            console.log('Buy Response Status (Missing Fields):', res.statusCode); // Debugging statement
            console.log('Buy Response Body (Missing Fields):', data); // Debugging statement
            resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
          });
        }
      );
      req.on('error', reject);
      req.write(requestData);
      req.end();
    });

    assert.strictEqual(response.statusCode, 400); // Expect error status code
    assert.strictEqual(response.body.message, 'userId, stockSymbol, quantity, and price are required'); // Expect error message
  });

  /**
   * @test
   * @description Test case for invalid input in the sellStock route.
   * This test checks the behavior when required fields are missing in the sell request.
   */
  test('should return error if required fields are missing in sell request', async () => {
    const requestData = JSON.stringify({ stockSymbol: 'AAPL', quantity: 10 }); // Missing userId and price
    console.log('Request Data for Sell (Missing Fields):', requestData); // Debugging statement

    const response = await new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: 'localhost', port: 3000, path: '/api/transactions/sell', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestData) } },
        (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            console.log('Sell Response Status (Missing Fields):', res.statusCode); // Debugging statement
            console.log('Sell Response Body (Missing Fields):', data); // Debugging statement
            resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
          });
        }
      );
      req.on('error', reject);
      req.write(requestData);
      req.end();
    });

    assert.strictEqual(response.statusCode, 400); // Expect error status code
    assert.strictEqual(response.body.message, 'userId, stockSymbol, quantity, and price are required'); // Expect error message
  });

});

