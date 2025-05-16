// In transactionModel.js

import { MongoClient } from 'mongodb';


const dbName = "SoftProj";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
var db;

/* Internal function to get connection */
async function _get_data_collection(collectionName) {
    await client.connect();
    db = await client.db(dbName);
    return await db.collection(collectionName);
};

/**
 * Retrieves all transactions by a specific playerId.
 * @param {string} playerId - The player's ID.
 * @returns {Promise<Array>} Array of transactions for the player.
 */
export async function getTransactionsByPlayerId(playerId) {
    console.log(playerId);
    const collection = await _get_data_collection("transactions");
    const transactions = await collection.find({ playerId }).project({
        _id: 1,
        playerId: 1,
        stock: 1,
        amount: 1,
        totalInvested: 1,
        type: 1,
        date: 1,
        totalSold: 1
    }).toArray();
    return transactions;
}