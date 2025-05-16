/**
 * Originally a Mongo implementation of persistence interface for Software project part II.
 * @module stockModel
 * @author Leonardo Eras <derasdelgado@mun.ca>
 * @version 0.0.1
 */

import { Double, MongoClient, ObjectId } from 'mongodb';
import { Stock, Stock_Data } from './stockObject.js'

const dbName = "SoftProj";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
var db;

/**
 * initialize the persistance tech - Mongo
 * @param {string} collectionName - name of the storage segment to use - Mongo collection
 * @throws an error if the tech (eg database) cannot be initialized
 * @returns the object corresponding to the storage segment for this tech
 */
export async function initStore(collectionName) {
    try {
        // Connect the client to the server
        await client.connect();
        // Our db name is going to be contacts-db
        db = await client.db(dbName);
        console.log("Connected successfully to mongoDB");

        // set a connection timeout
        setTimeout( () => client.close(), 3000 )

    } catch (err) {
        throw err;
    }

    return await db.collection(collectionName);
}

/* Internal function to get connection */
async function _get_data_collection(collectionName) {
    await client.connect();
    db = await client.db(dbName);
    return await db.collection(collectionName);
};

async function _close_collection() {
    await client.close();
    return 'Connection closed';
};

/**
 * Close the access to the persistance db. Call when db session is finished. 
 * @function closeStore
 * @returns string confirming close.
 */
async function closeStore() {
    await client.close();
    return 'Connection closed';
};

/**
 * Creates a stock
 * @function createStock
 * @param {Stock} stock - stock to create
 * @returns true if portfolio is creted, false otherwise
 */
export async function createStock(stock) {
    let collection = await _get_data_collection("stock");
    try {
        let mongoObj = await collection.insertOne(stock);
        console.log('1 Stock object was inserted in the database with id -> ' + mongoObj.insertedId);
        return mongoObj.insertedId;
    } catch(error){
        return false;
    }
}


/**
 * Creates a stock data
 * @function createStockData
 * @param {Stock_Data} stock_data - stock to create
 * @returns true if portfolio is creted, false otherwise
 */
export async function createStockData(stock_data) {
    let collection = await _get_data_collection("stock_data");
    try {
        let stockdata = await getStockData(stock_data.id);
        if (stockdata.id){
            console.log('Object stock data already in the database!' + stockdata.id);
            return stockdata.id;
        } else {
            let mongoObj = await collection.insertOne(stock_data);
            console.log('1 Stock Data object was inserted in the database with id -> ' + mongoObj.insertedId);
            return mongoObj.insertedId;
        }
    } catch(error){
        return false;
    }
}


/**
 * Gets all stocks associated with a portfolio
 * @function getStocks
 * @param {Int} portfolioID - Portfolio Identifier
 * @param {Boolean} enabled - Stock status - enabled means it is able to be sold (default), disabled means it was already sold
 * @returns stocks associated with the current portfolio
 * @Throws Error if portfolio was not provided
 */
export async function getStocks(portfolioID, enabled = true) {
    let collection = await _get_data_collection("stock");
    if (portfolioID) {
        let objs = await collection.find({"portfolio": portfolioID, "enabled": enabled}).toArray();
        if (objs.length > 0){
            return objs.map(o => new Stock(o._id, o.portfolio, o.symbol, o.name, o.type, o.quantity, o.valueAtPurchase, o.purchasedAt, o.valueSold, o.enabled));
        } else {
            return [];
        }
    } else {
        throw Error("Show me your ID to enter the club!");
    }
}


/**
 * Gets a single stock
 * @function getStockById
 * @param {Int} stockId - Portfolio Identifier
 * @returns stocks associated with the current portfolio
 * @Throws Error if stockId was not provided
 */
export async function getStockById(stockId) {
    let collection = await _get_data_collection("stock");
    if (stockId) {
        let objs = await collection.find({"_id": new ObjectId(stockId)}).toArray();
        if (objs.length > 0){
            return objs.map(o => new Stock(o._id, o.portfolio, o.symbol, o.name, o.type, o.quantity, o.valueAtPurchase, o.purchasedAt, o.valueSold, o.enabled))[0];
        } else {
            return [];
        }
    } else {
        throw Error("Show me your ID to enter the club!");
    }
}

export async function getStocksByPortfolioId(portfolioId) {
    try {
        // Fetch the stock collection
        const stockCollection = await _get_data_collection("stock");
        
        // Query the collection for stocks that belong to the specific portfolio
        const stocks = await stockCollection.find({ portfolio: portfolioId }).project({
            _id: 1,
            id: 1,
            portfolio: 1,
            symbol: 1,
            name: 1,
            type: 1,
            quantity: 1,
            valueAtPurchase: 1,
            purchasedAt: 1,
            valueAtEnd: 1,
            enabled: 1
        }).toArray();

        return stocks;  // Return the list of stocks for the given portfolio
    } catch (error) {
        console.error('Error fetching stocks:', error);
        throw error;  // Re-throw the error for further handling
    }
}


/**
 * Gets all stock data associated with a portfolio
 * @function getStockData
 * @param {Int} stock_dataId - StockData Identifier
 * @returns stocks_data, identified by stock_dataId
 * @Throws Error if stock_dataId was not provided
 */
export async function getStockData(stock_dataId) {
    let collection = await _get_data_collection("stock_data");
    if (stock_dataId) {
        let objs = await collection.find({"id": stock_dataId}).toArray();
        if (objs.length > 0){
            return objs.map(o => new Stock_Data(o.id, o.symbol, o.name, o.type)[0]);
        } else {
            return [];
        }
    } else {
        throw Error("Show me your ID to enter the club!");
    }
}

/**
 * Gets all stock data
 * @function getStockData
 * @returns {Array} stocks_data
 */
export async function getAllStockData() {
    let collection = await _get_data_collection("stock_data");

    let objs = await collection.find().toArray();
    if (objs.length > 0){
        return objs.map(o => new Stock_Data(o.id, o.symbol, o.name, o.type));
    } else {
        return [];
    }
}


/**
 * Updates a stock quantity, values admitted (0 - n)
 * @function updateFunds
 * @param {String} stockId
 * @param {Double} newQuantity - value to assign to the stock quantity
 * @returns true if stock is updated, false otherwise
 * @throws Error if either stockId or newQuantity is not provided
 */
export async function updateQuantity(stockId, newQuantity) {
    let collection = await _get_data_collection("stock");
    if (stockId) {
        if (newQuantity){
            if (typeof newQuantity === "number"){
                if (newQuantity > 0){
                    var resultOperation = await collection.updateOne({ '_id': new ObjectId(stockId) }, {$set:{quantity: newQuantity}} );
                    if (resultOperation.modifiedCount > 1){
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    throw Error("Should only assign a value over 0");
                }
            } else {
                throw Error("Should be a number");
            }
        } else {
            throw Error("No value was provided");
        }
    } else {
        throw Error("Show me your ID");
    }
}


/**
 * Updates a stock sold price, values admitted (0 - n)
 * @function updateSoldValue
 * @param {String} stockId
 * @param {Double} newQuantity - value to assign to the stock soldAt value
 * @returns true if stock is updated, false otherwise
 * @throws Error if either stockId or newQuantity is not provided
 */
export async function updateSoldValue(stockId, newQuantity) {
    let collection = await _get_data_collection("stock");
    if (stockId) {
        if (newQuantity){
            if (typeof newQuantity === "number"){
                if (newQuantity > 0){
                    var resultOperation = await collection.updateOne({ '_id': new ObjectId(stockId) }, {$set:{valueSold: newQuantity}} );
                    if (resultOperation.modifiedCount > 1){
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    throw Error("Should only assign a value over 0");
                }
            } else {
                throw Error("Should be a number");
            }
        } else {
            throw Error("No value was provided");
        }
    } else {
        throw Error("Show me your ID");
    }
}


/**
 * Disables a stock (set enabled = false). I won't delete a stock, it could be useful for tracking reasons
 * @function disableStock
 * @param {String} stockId
 * @returns true if stock is updated, false otherwise
 * @throws Error if either stockId is not provided
 */
export async function disableStock(stockId) {
    let collection = await _get_data_collection("stock");
    if (stockId) {
        var resultOperation = await collection.updateOne({ '_id': new ObjectId(stockId) }, { $set:{enabled: false}} );
        if (resultOperation.modifiedCount > 1){
            return true;
        } else {
            return false;
        }
    } else {
        throw Error("Show me your ID");
    }
}

export default { closeStore, initStore, createStock, createStockData, getStocks, getStockById, getAllStockData, getStockData, updateQuantity, disableStock, updateSoldValue };