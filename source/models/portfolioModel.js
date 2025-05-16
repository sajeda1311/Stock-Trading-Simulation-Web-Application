/**
 * Originally a Mongo implementation of persistence interface for Software project part II.
 * @module portfolioModel
 * @author Leonardo Eras <derasdelgado@mun.ca>
 * @version 0.0.1
 */

import { Double, MongoClient, ObjectId } from 'mongodb';
import { Portfolio } from './portfolioObject.js'

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
 * Creates a portfolio
 * @function createPortfolio
 * @param {Portfolio} portfolio - portfolio to create
 * @returns true if portfolio is creted, false otherwise
 */
export async function createPortfolio(portfolio) {
    let collection = await _get_data_collection("portfolio");
    try {
        let mongoObj = await collection.insertOne(portfolio);
        console.log('1 Portfolio was inserted in the database with id -> ' + mongoObj.insertedId);
        return mongoObj.insertedId;
    } catch(error){
        return false;
    }
}

/**
 * Updates a portfolio funds, looking for the duo name - owner
 * @function updateFunds
 * @param {String} portfolioID
 * @param {Double} newFunds - value to assign to the portfolio
 * @returns true if portfolio is updated, false otherwise
 * @throws Error if either portfolioID or newFunds is not provided
 */
export async function updateFunds(portfolioID, newFunds) {
    let collection = await _get_data_collection("portfolio");
    if (portfolioID) {
        if (newFunds){
            if (typeof newFunds === "number"){
                if (newFunds > 0){
                    var resultOperation = await collection.updateOne({ '_id': new ObjectId(portfolioID) }, {$set:{funds: newFunds}} );
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
 * Gets whether a player has a portfolio associated or not
 * @function getPlayerPortfolios
 * @param {string} [username] - username of player
 * @returns portfolios associated with player
 * @Throws Error if username was not provided
 */
export async function getPlayerPortfolios(username) {
    let collection = await _get_data_collection("portfolio");
    if (username) {
        let objs = await collection.find({"owner": username}).toArray();
        if (objs.length > 0){
            return objs.map(o => new Portfolio(o._id, o.owner, o.name, o.timeLimit, o.createdAt, o.funds, o.challenge_mode));
        } else {
            return [];
        }
    } else {
        throw Error("A man needs a name");
    }
}


/**
 * @function getPortfolioById
 * @param {string} [id] - id of portfolio
 * @returns portfolio associated with id
 * @Throws Error if id was not provided
 */
export async function getPortfolioById(id) {
    let collection = await _get_data_collection("portfolio");
    if (id) {
        let objs = await collection.find({"_id": new ObjectId(id)}).toArray();
        if (objs.length > 0){
            return objs.map(o => new Portfolio(o._id, o.owner, o.name, o.timeLimit, o.createdAt, o.funds, o.challenge_mode))[0];
        } else {
            return [];
        }
    } else {
        throw Error("A man needs an id");
    }
}


/**
 * @function getAllNonPracticePortfolios
 * @returns All non practice (timelimit > 0) portfolios
 */
export async function getAllNonPracticePortfolios() {
    let collection = await _get_data_collection("portfolio");
    let objs = await collection.find({"timeLimit": { $gt: 0 }}).toArray();
    if (objs.length > 0){
        return objs.map(o => new Portfolio(o._id, o.owner, o.name, o.timeLimit, o.createdAt, o.funds, o.challenge_mode));
    } else {
        return [];
    }
}


/**
 * This function returns an example (one record) per creationTime of a non-practice portfolio. A game is actually a portfolio.
 * When an admin creates a game, it creates portfolios per each selected player, these games
 * share a creation time (date time object). I just need one for this part of the admin process
 * @function getAllGames
 * @returns {Array} list of records
 */
export async function getAllGames() {
    let collection = await _get_data_collection("portfolio");
    var creationDates = await collection.distinct('createdAt', {timeLimit: { $gt: 0}});
    var result = [];
    for (var item in creationDates){
        var obj = await collection.find({"createdAt": creationDates[item], 'timeLimit': { $gt: 0}}).toArray();
        result.push(obj);
    }
    return result;
}


/**
 * Deletes a portfolio, used for testing
 * @function deletePortfolio
 * @param {string} portfolioID - Portfolio id to delete
 * @returns true if portfolio was deleted, false otherwise.
 * @throws Error when no id was provided
 */
export async function deletePortfolio(portfolioID = null) {
    let collection = await _get_data_collection("portfolio");
    if (portfolioID) {
        let resultOperation = await collection.deleteOne({'_id': new ObjectId(portfolioID) });
        if (resultOperation.deletedCount > 0){
            return true;
        } else {
            return false;
        }
    } else {
        throw Error("Show me your ID");
    }
}


export async function getPlayerPortfoliosall() {
    try {
        // Assuming _get_data_collection is a function that retrieves your MongoDB collection
        let collection = await _get_data_collection("portfolio");

        // Fetch all portfolios from the collection
        let portfolios = await collection.find({}).toArray();
        console.log("okay 2",portfolios);
        // Check if portfolios exist and return them
        if (portfolios.length > 0) {
            return portfolios.map(portfolio => {
                // Assuming Portfolio is a class or constructor that processes the data
                return new Portfolio(
                    portfolio._id,
                    portfolio.owner,
                    portfolio.name,
                    portfolio.timeLimit,
                    portfolio.createdAt,
                    portfolio.funds
                );
            });
        } else {
            return [];  // Return an empty array if no portfolios are found
        }
    } catch (error) {
        console.error('Error fetching all portfolios:', error);
        throw error;  // Re-throw error for further handling
    }
}

export default { closeStore, initStore, createPortfolio, updateFunds, getPlayerPortfolios, getPortfolioById, deletePortfolio, getAllNonPracticePortfolios, getAllGames };