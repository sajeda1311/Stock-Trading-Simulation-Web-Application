/**
 * Originally a Mongo implementation of persistence interface for Software project part II.
 * @module playerModel
 * @author Leonardo Eras <derasdelgado@mun.ca>
 * @version 0.0.2
 */

import { MongoClient } from 'mongodb';
import { Player } from './playerObject.js'

const dbName = "SoftProj";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
var db;

/**
 * initialize the persistance tech - Mongo
 * 
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
    // Connect the client to the server
    await client.connect();
    // Our db name is going to be contacts-db
    db = await client.db(dbName);
    // console.log("Connected successfully to mongoDB");  
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
 * store/persist a user
 * @function addUser
 * @param {Contact} user - user to add
 * @returns true - if user add is successful, false otherwise
 */
async function addUser(user) {
    let collection = await _get_data_collection("users");
    let doesUserExistAlready = await findUser(user.username);
    if (doesUserExistAlready){
        return false;
    } else {
        let mongoObj = await collection.insertOne(user);
        console.log('1 Contact was inserted in the database with id -> ' + mongoObj.insertedId);
        return true;
    }
}

/**
 * Deletes a user by its username
 * @function deleteUser
 * @param {string} username - username of the user to be deleted
 * @returns true if user was deleted, false otherwise.
 * @throws Error when no username was provided
 */
async function deleteUser(username = null) {
    let collection = await _get_data_collection("users");
    if (username) {
        let resultOperation = await collection.deleteOne({'username': username });
        if (resultOperation.deletedCount > 0){
            return true;
        } else {
            return false;
        }
    } else {
        throw Error("A man needs a name");
    }
}

/**
 * retrieve user info in the db/persistance tech
 * @function findUser
 * @param {string} [username] - username of user to find
 * @returns {Player} if user was found, false otherwise
 * @Throws Error if username was not provided
 */
async function findUser(username = null) {
    let collection = await _get_data_collection("users");
    if (username) {
        let objs = await collection.find({"username": username}).toArray();
        if (objs.length == 1){ //Should return only one!
            return objs.map(o => new Player(o.name, o.lastName, o.username, o.password, o.email, o.is_admin))[0];
        } else {
            return false;
        }
    } else {
        throw Error("A man needs a name");
    }
}

/**
 * Retrieve user info in the db/persistance tech, using two values
 * @function authenticate
 * @param {string} [username] - username of user to find
 * @param {string} [password] - password of user to find
 * @returns true if credentials match, false otherwise
 * @throws an error if username was not found
 */
async function authenticate(username = null, password = null) {
    if(username){
        let collection = await _get_data_collection("users");
        let obj = await collection.find({"username": username, "password": password}).toArray();
        if (obj.length == 1){ //Should return only one!
            return true
        } else {
            return false;
        }
    } else {
        throw Error("Not enough data to operate normally");
    }
}


/**
 * retrieve players except that with the username provided
 * @function findEveryoneButUser
 * @param {string} [username] - username to filter out
 * @returns {Array} - of users
 * @Throws Error if username was not provided
 */
async function findEveryoneButUser(username = null) {
    let collection = await _get_data_collection("users");
    if (username) {
        let objs = await collection.find({"username": { $ne: username }}).toArray();
        if (objs.length > 0){
            return objs.map(o => new Player(o.name, o.lastName, o.username, o.password, o.email, o.is_admin));
        } else {
            return [];
        }
    } else {
        throw Error("A man needs a name");
    }
}



/**
 * retrieve players except that with the username provided
 * @function getAllPlayers
 * @returns {Array} - of users
 */
async function getAllPlayers() {
    let collection = await _get_data_collection("users");
    let objs = await collection.find({"is_admin": { $ne: true }}).toArray();
    if (objs.length > 0){
        return objs.map(o => new Player(o.name, o.lastName, o.username, o.password, o.email, o.is_admin));
    } else {
        return [];
    }
}


/**
 * Updates the user admin rights
 * @function grantAdminRights
 * @param {string} [username] - username of player to find
 * @returns {boolean} true if change was made, false otherwise
 * @Throws Error if username was not provided
 */
async function grantAdminRights(username) {
    let user = await findUser(username);
    let collection = await _get_data_collection("users");
    if (user) {
        let new_val = { $set: { 'is_admin': true } };
        let obj = await collection.updateOne({'username': user.username}, new_val);
        if (obj.modifiedCount > 0) {
            return true;
        } else {
            return false
        }
    } else {
        throw Error("A man needs a name");
    }
}

export default { closeStore, initStore, addUser, findUser, authenticate, deleteUser, findEveryoneButUser, grantAdminRights, getAllPlayers }