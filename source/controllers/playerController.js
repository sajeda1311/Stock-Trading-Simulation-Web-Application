import playerModel from '../models/playerModel.js';
import portfolioModel, { createPortfolio } from '../models/portfolioModel.js';
import stockModel from '../models/stockModel.js';
import { SHA3 } from 'sha3';
import { Player } from '../models/playerObject.js';
import { Portfolio } from '../models/portfolioObject.js';
import { Stock } from '../models/stockObject.js'
import { getAvailability } from '../utils/controller-utils.js';
import validator from 'validator';
import axios from 'axios';

const usersStore = "users";
const portfolioStore = "portfolio";
const stockStore = "stock";
const stockDataStore = "stockData"
const standardPortfolioFunds = 10000;

export function users_init() {
    playerModel.initStore(usersStore);
    portfolioModel.initStore(portfolioStore);
    stockModel.initStore(stockStore);
    stockModel.initStore(stockDataStore);
};

export const login = async (req, res) => {
    const { username_input: username, pass_input: password, 'g-recaptcha-response': recaptchaToken } = req.body;

    try {
        // Verify reCAPTCHA token with Google
        const secretKey = '';
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify`;

        const response = await axios.post(verificationUrl, null, {
            params: {
                secret: secretKey,
                response: recaptchaToken,
            },
        });

        const { success } = response.data;

        if (!success) {
            return res.render('login', { username, message: "reCAPTCHA verification failed. Please try again." });
        }

        // Continue with authentication if reCAPTCHA succeeds
        const userExists = await authenticate(username, password);
        if (userExists) {
            var player = await findUser(username);
            req.session.player = player;
            if (!player.is_admin) {
                res.redirect('dashboard');
            } else {
                res.redirect('adminDashboard');
            }
        } else {
            res.render('login', { username, message: "Wrong username or password!" });
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        res.render('login', { username, message: "An error occurred. Please try again later." });
    }
};

export const register = async (req, res) => {
    const { name_input: name, lastname_input: lastname, username_input: username, email_input: email, password_input: pass, repeat_pass: rep_pass } = req.body;
    let message = "";

    if (!validator.isEmail(email)) {
        message = "Bad email address";
    } else if (pass !== rep_pass) {
        message = "Passwords do not match!";
    } else if (await findUser(username)) {
        message = "Username already exists!";
    }

    if (message) {
        res.render('register', { name, lastname, username, email, message });
    } else {
        await createUser({ name, lastname, username, password: pass, email, is_admin: false });
        let portfolio = new Portfolio(null, username, "Demo Portfolio", -1, new Date(), standardPortfolioFunds, false);
        await portfolioModel.createPortfolio(portfolio);
        req.session.username = username;
        res.redirect('dashboard');
    }
}

export const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error logging out");
        }
        res.clearCookie('connect.sid');
        res.redirect('login'); // Redirect to login after logout
    });
}

export const dashboard = async (req, res) => {
    const player = req.session.player;
    var username = "";
    try {
        username = player.username;
    } catch (error){
        return res.redirect('login'); // Redirect to login if not authenticated
    }

    var names = player.name + " " + player.lastName;
    let portfolios_db = await getPlayerPortfolios(username);
    var portfolios = [];
    for (var portfolio in portfolios_db){
        var item = portfolios_db[portfolio];
        var id = item.id;
        var name = item.name;
        var availability = getAvailability(item.createdAt, item.timeLimit);
        var createdAt = item.createdAt;
        var funds = item.funds;
        var challenge_mode = item.challenge_mode;
        portfolios.push({id, name, availability, createdAt, funds, challenge_mode});
    }
    res.render('playerDashboard', { names: names, portfolios: portfolios });
}

/**
 * Admin dashboard handler for displaying user and game information.
 * This function fetches a list of users excluding the current logged-in user, 
 * and retrieves all the games to categorize them into active and expired games.
 * For expired games, the function calculates the winner based on player portfolios.
 *
 * @async
 * @function adminDashboard
 * @param {Object} req - The request object, which contains session data for the logged-in player.
 * @param {Object} res - The response object, used to render the admin dashboard view.
 * @returns {Promise<void>} Renders the 'adminDashboard' view with user and game data.
 * 
 * @throws {Error} If an error occurs while fetching users or games, the user is redirected to the login page.
 */
export const adminDashboard = async (req, res) => {
    var user = req.session.player;
    var users = [];
    try {
        users = await getEveryoneButUser(user.username);
    } catch (error) {
        return res.redirect('login');
    }

    var allGames = await getAllGames();
    var activeGames = [];
    var expiredGames = [];

    for (var item in allGames) {
        var games = allGames[item];
        var dateCreated = new Date(games[0].createdAt);
        var endingTime = new Date(dateCreated.getTime() + games[0].timeLimit * 1000); // Convert timeLimit to milliseconds

        if (endingTime <= new Date()) {
            // Calculate the winner for expired games
            let gameId = games[0]._id; // Assuming each game has a unique ID
            let players = games.map(game => game.owner); // Get all player usernames from the portfolio (game)

            let winner = null;
            let maxProfit = -Infinity;

            for (let player of players) {
                // Fetch portfolios associated with each player for the game
                let portfolios = await getPlayerPortfolios(player);
                let portfolio = portfolios.find(p => p.createdAt.getTime() === games[0].createdAt.getTime());

                if (portfolio) {
                    let totalFunds = portfolio.funds; // Remaining funds
                    let totalWealth = totalFunds; // Assuming profits are embedded or just funds are evaluated

                    if (totalWealth > maxProfit) {
                        maxProfit = totalWealth;
                        winner = player;
                    }
                }
            }

            var expiredGame = {
                "name": games[0].name,
                "endedAt": endingTime,
                "players": players.length,
                "winner": winner || "No winner",
            };
            expiredGames.push(expiredGame);
        } else {
            var activeGame = {
                "name": games[0].name,
                "createdAt": dateCreated,
                "players": games.length,
                "endingAt": endingTime,
                "mode": games[0].challenge_mode,
            };
            activeGames.push(activeGame);
        }
    }

    return res.render('adminDashboard', {
        users: users,
        activeGames: activeGames,
        expiredGames: expiredGames,
    });
};


/**
 * Calculates scores (funds + profit) for all players in a game.
 * @param {Array} game - Array of portfolios for a game
 * @returns {Array} Scores for each player
 */
async function calculateScoresForGame(game) {
    const scores = [];

    for (const portfolio of game) {
        const { username, funds } = portfolio;

        // Fetch player's stock profits
        const stockProfits = await calculateStockProfits(username);

        // Calculate total score
        const totalScore = funds + stockProfits;

        scores.push({ username, score: totalScore });
    }

    return scores;
}

/**
 * Calculate the total profit from stocks for a player.
 * @param {string} username
 * @returns {number} Total stock profit
 */
async function calculateStockProfits(username) {
    const playerStocks = await stockModel.getPlayerStocks(username); // Assumes this function exists
    let totalProfit = 0;

    for (const stock of playerStocks) {
        const { purchasePrice, currentPrice, quantity } = stock;
        totalProfit += (currentPrice - purchasePrice) * quantity;
    }

    return totalProfit;
}




/**
 * A function that adds a user to the store.
 * @function createUser
 * @param {*} user_values attributes of the object must match the attributes of a Contact - name, email, telephone and address
 * @returns { Player } if the operation completed successfully, false otherwise
 */
export async function createUser(user_values) {

    if( ! user_values.name ){
        return false // no values added
    }

    let name = user_values.name;
    let lastname = user_values.lastname;
    let username = user_values.username;
    let password = user_values.password;
    let email = user_values.email;
    let is_admin = user_values.is_admin;

    var passSHA3 = stringToSHA3(password);
    let new_user = new Player(name, lastname, username, passSHA3, email, is_admin);
    let operationResult = await playerModel.addUser(new_user);
    if (operationResult){
        return new_user;
    } else {
        return false;
    }
};

/**
 * Takes a string and returns its SHA3 hash
 * @function stringToSHA3
 * @param {str} secretString
 * @returns {SHA3} the hashed string, an empty string if no string is provided
 */
export function stringToSHA3(secretString){
    if (secretString){
        const hash = new SHA3(256);
        hash.update(secretString);
        const result = hash.digest('hex');
        return result;
    }
    return "";
}

/**
 * Retreive a user by username
 * @function findUser
 * @param {str} findusername
 * @returns {Player} the first (and only) user in the store matching username
 */
export async function findUser(findusername) {
    let user = await playerModel.findUser(findusername);
    return user
};


/**
 * Deletes a user by its username field
 * @function deleteUser
 * @param {str} findusername
 * @returns {Player} the first (and only) user in the store matching username
 */
export async function deleteUser(findusername) {
    let contact = await playerModel.deleteUser(findusername);
    return contact
};

/**
 * @function authenticate
 * @param {string} username
 * @param {string} password
 * @returns true if user exists and the username, password duo matches. Returns false otherwise.
 */
export async function authenticate(username, password){
    // This module handles the password part, the username exceptions are handled over playerModels.authenticate
    var passSHA3 = stringToSHA3(password);
    let authResult = await playerModel.authenticate(username, passSHA3);
    return authResult;
}

/**
 * @function getPlayerPortfolios
 * @param {string} username
 * @returns gets all player portfolios
 */
export async function getPlayerPortfolios(username){
    let portfolios = portfolioModel.getPlayerPortfolios(username);
    return portfolios;
}


/**
 * This function returns an example (one record) per creationTime of a non-practice portfolio. A game is actually a portfolio.
 * When an admin creates a game, it creates portfolios per each selected player, these games
 * share a creation time (date time object). I just need one for this part of the admin process
 * @function getAllGames
 * @returns {Array} of portfolios
 */
export async function getAllGames(){
    let portfolios = portfolioModel.getAllGames();
    return portfolios;
}

/**
 * @function getEveryoneButUser
 * @param {string} username
 * @returns gets all users, except the one filtered out
 */
export async function getEveryoneButUser(username){
    let users = await playerModel.findEveryoneButUser(username);
    return users;
}


export const grantAdminRights = async (req, res) => {
    const player = req.session.player;
    var userToChange = req.params.user;
    var username = "";
    try {
        username = player.username;
    } catch (error){
        return res.redirect('login'); // Redirect to login if not authenticated
    }

    try {
        if(!player.is_admin){
            return res.status(403).send("This can only be done by admins!");
        } else {
            playerModel.grantAdminRights(userToChange);
            return res.redirect('/player/adminDashboard');
        }
    } catch (err){
        return res.redirect('login'); // Redirect to login if not authenticated
    }
}


export const newGameView = async (req, res) => {
    const player = req.session.player;
    var username = "";
    try {
        username = player.username;
    } catch (error){
        return res.redirect('login'); // Redirect to login if not authenticated
    }

    try {
        if(!player.is_admin){
            res.status(403).send("This can only be done by admins!");
        } else {
            var players = await getAllPlayers();
            var limitDate = new Date();
            var minDate = limitDate.getFullYear() + "-" + (limitDate.getMonth() + 1) + "-"
            + String(limitDate.getDay() + 1).padStart(2, '0') + "T"
            + String(limitDate.getHours()).padStart(2, '0') + ":" + String(limitDate.getMinutes()).padStart(2, '0');
            res.render("createGame", {"players": players , "minDate": minDate});
        }
    } catch (err){
        return res.redirect('login'); // Redirect to login if not authenticated
    }
}


export const createGame = async (req, res) => {
    var gameName = req.body.gameName;
    var playerSelected = req.body.players;
    var endTime = req.body.endTime;
    var funds = req.body.funds;
    var createdAt = new Date();
    var timeLimit = Math.round((new Date(endTime) - createdAt)/1000); // Milliseconds to seconds here!
    var challengeMode = req.body.ch_mode;

    if(req.body.ch_mode === "ch_mode"){
        var challengeMode = true;
    } else {
        var challengeMode = false;
    }
    if (Array.isArray(playerSelected)){
        for (var item in playerSelected){
            var player = playerSelected[item];
            var portfolio = new Portfolio(null, player, gameName, timeLimit, createdAt, funds, challengeMode);
            await createPortfolio(portfolio);
        }
    } else {
        var portfolio = new Portfolio(null, playerSelected, gameName, timeLimit, createdAt, funds, challengeMode);
        await createPortfolio(portfolio);
    }
    return res.redirect('adminDashboard');
}


/**
 * @function getAllPlayers
 * @param {string} username
 * @returns gets all users that are not admin users
 */
export async function getAllPlayers(){
    let users = await playerModel.getAllPlayers();
    return users;
}
