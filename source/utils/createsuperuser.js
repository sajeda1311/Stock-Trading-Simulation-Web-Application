import { createUser } from "../controllers/playerController.js";
import { Player } from "../models/playerObject.js";

var adminUser = process.argv[2];
var password = process.argv[3];

if (adminUser && password){
    var superUser = new Player("Admin", "Admin", adminUser, password, adminUser + "@email.com", true);
    var result = await createUser(superUser);
    if (result){
        console.log("Admin user successfully created!");
        console.log("Try to login as admin with the following credentials:");
        console.log("\tUsername: " + superUser);
        console.log("\tPassword: " + password);
        console.log("Don't forget these credentials!");
    } else {
        console.log("Error creating this user. Possible causes: User already exists!");
    }
    console.log("You can safely close this script with CTRL + C");
} else {
    console.log("createsuperuser.js - arguments missing");
    console.log("Basic usage:");
    console.log("node createsuperuser.js [username] [password]");
    console.log("\t[username] - A string username to assign the new admin user.");
    console.log("\t[password] - A string password to assign the new admin user. Please don't forget about the password.");
    console.log("\tAny extra argument is discarded.");
}