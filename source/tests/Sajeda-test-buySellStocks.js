import { MongoClient } from 'mongodb';
import { buyStock, sellStock } from '../controllers/transactionController.js';
import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import assert from 'assert';
import { before, suite, test, after } from 'node:test';

const app = express();
app.use(bodyParser.json());

app.post('/buy', buyStock);
app.post('/sell', sellStock);

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'SoftProj';
let client;
let db;
let collection;

suite('Stock Transactions Tests', () => {

  before(async () => {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    collection = db.collection('transactions');
    await collection.deleteMany({});
  });

  after(async () => {
    await client.close();
  });

  test('should buy stock successfully', async () => {
    const requestData = JSON.stringify({ userId: 'user456', stockSymbol: 'TSLA', quantity: 5, price: 200 });
    const response = await makeRequest('/api/transactions/buy', requestData);
    
    assert.strictEqual(response.statusCode, 201);
    assert.strictEqual(response.body.message, 'Stock purchased successfully');
  });

  test('should sell stock successfully', async () => {
    await collection.insertOne({ playerId: 'user456', stock: 'TSLA', amount: 10, totalInvested: 2000, type: 'buy', date: new Date() });
    const requestData = JSON.stringify({ userId: 'user456', stockSymbol: 'TSLA', quantity: 5, price: 210 });
    const response = await makeRequest('/api/transactions/sell', requestData);

    assert.strictEqual(response.statusCode, 201);
    assert.strictEqual(response.body.message, 'Stock sold successfully');
  });

  test('should return error for insufficient stock quantity', async () => {
    const requestData = JSON.stringify({ userId: 'user456', stockSymbol: 'TSLA', quantity: 20, price: 210 });
    const response = await makeRequest('/api/transactions/sell', requestData);

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, 'Not enough stocks to sell');
  });

  test('should return error for missing required fields in buy request', async () => {
    const requestData = JSON.stringify({ stockSymbol: 'TSLA', quantity: 5 }); // Missing userId and price
    const response = await makeRequest('/api/transactions/buy', requestData);

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, 'userId, stockSymbol, quantity, and price are required');
  });

  test('should return error for zero quantity in sell request', async () => {
    await collection.insertOne({ playerId: 'user456', stock: 'TSLA', amount: 10, totalInvested: 2000, type: 'buy', date: new Date() });
    const requestData = JSON.stringify({ userId: 'user456', stockSymbol: 'TSLA', quantity: 0, price: 210 });
    const response = await makeRequest('/api/transactions/sell', requestData);

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.message, 'Quantity must be greater than zero');
  });

  async function makeRequest(path, requestData) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        { hostname: 'localhost', port: 3000, path, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(requestData) } },
        (res) => {
          let data = '';
          res.on('data', chunk => { data += chunk; });
          res.on('end', () => {
            resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
          });
        }
      );
      req.on('error', reject);
      req.write(requestData);
      req.end();
    });
  }
});
