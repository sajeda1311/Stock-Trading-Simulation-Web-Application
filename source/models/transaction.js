import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'SoftProj';
const collectionName = 'transactions';

/**
 * Connects to MongoDB and retrieves the transactions collection.
 *
 * @async
 * @function getTransactionsCollection
 * @returns {Promise<Object>} An object containing MongoDB client and transactions collection
 */
async function getTransactionsCollection() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  const db = client.db(dbName);
  return { client, collection: db.collection(collectionName) };
}

/**
 * Inserts a new transaction into the transactions collection.
 *
 * @async
 * @function insertTransaction
 * @param {Object} transactionData - The data of the transaction to insert
 * @returns {Promise<Object>} The inserted transaction document
 */
async function insertTransaction(transactionData) {
  const { client, collection } = await getTransactionsCollection();
  try {
    const result = await collection.insertOne(transactionData);
    return result.ops[0];
  } finally {
    await client.close();
  }
}

/**
 * Finds transactions in the transactions collection based on the specified query.
 *
 * @async
 * @function findTransactions
 * @param {Object} query - The query criteria for finding transactions
 * @returns {Promise<Array>} An array of transaction documents that match the query
 */
async function findTransactions(query) {
  const { client, collection } = await getTransactionsCollection();
  try {
    const transactions = await collection.find(query).toArray();
    return transactions;
  } finally {
    await client.close();
  }
}

/**
 * Updates a transaction in the transactions collection based on the specified filter and update data.
 *
 * @async
 * @function updateTransaction
 * @param {Object} filter - The filter criteria for the transaction to update
 * @param {Object} updateData - The data to update in the transaction document
 * @returns {Promise<number>} The count of modified documents
 */
async function updateTransaction(filter, updateData) {
  const { client, collection } = await getTransactionsCollection();
  try {
    const result = await collection.updateOne(filter, { $set: updateData });
    return result.modifiedCount;
  } finally {
    await client.close();
  }
}

/**
 * Deletes a transaction from the transactions collection based on the specified filter.
 *
 * @async
 * @function deleteTransaction
 * @param {Object} filter - The filter criteria for the transaction to delete
 * @returns {Promise<number>} The count of deleted documents
 */
async function deleteTransaction(filter) {
  const { client, collection } = await getTransactionsCollection();
  try {
    const result = await collection.deleteOne(filter);
    return result.deletedCount;
  } finally {
    await client.close();
  }
}

// Export all functions as a single object
export default {
  insertTransaction,
  findTransactions,
  updateTransaction,
  deleteTransaction
};