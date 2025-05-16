import assert from 'assert';
import { before, suite, test, after } from 'node:test';
import { users_init, createUser, stringToSHA3, findUser, deleteUser, authenticate} from "../playerRegistration.mjs"
import { log } from 'console';

let test_data = [// Adding a new user
    {
        name: 'Sajeda',
        lastname: "Patel",
        username: 'sajeda1311',
        password: "sajeda.111",
        email: 'spatel@mun.ca',
    },
    // Adding another user
    {
        name: 'Leo',
        lastname: "Eras",
        username: 'leoEras',
        password: "LeoEras23",
        email: 'LeoEras@mun.ca',
    },
    // Adding another one
    {
        name: 'Vaibhav',
        lastname: "Thummar",
        username: 'vThummar',
        password: "Bhjij@41se",
        email: 'vThummar@gmail.com',
    },
    {
        name: 'Aaquil',
        lastname: "Syed",
        username: 'sAbbas9',
        password: "S@bbas@89",
        email: 'sabbas@domain.com',
    }
]

suite('Adding a player operations', function () {
    before(() => users_init('testStore'))
    after(async function () {
        for (var item in test_data){
            await deleteUser(test_data[item].username);
        }
    });

    test('Adding a new player', async function () {
        await createUser(test_data[0]);
        await createUser(test_data[1]);
        await createUser(test_data[2]);
        await createUser(test_data[3]);

        let player = await findUser(test_data[1].username);
        console.log('Player =>', player);
        assert.strictEqual(test_data[1].name, player.name);
    });

    test('Adding an exisiting player', async function () {
        let repeatedPlayer = await createUser(test_data[2]);
        console.log('Repeated User =>', repeatedPlayer);
        assert.strictEqual(false, repeatedPlayer);
    });
});

suite('Finding a player operations', function () {
    before(() => users_init('testStore'))
    after(async function () {
        for (var item in test_data){
            await deleteUser(test_data[item].username);
        }
    });

    test('Finding a player with username provided', async function () {
        await createUser(test_data[3]);

        let player1 = await findUser(test_data[3].username);
        console.log('Player 1 =>', player1);
        assert.strictEqual(test_data[3].name, player1.name);

        let player2 = await findUser("Dummy Username");
        console.log('Player 2 =>', player2);
        assert.strictEqual(false, player2);

    });

    test('Finding a player without username provided', async function () {
        assert.rejects(findUser());
    });
});


suite('Deleting a player operations', function () {
    before(() => users_init('testStore'))
    after(async function () {
        for (var item in test_data){
            await deleteUser(test_data[item].username);
        }
    });

    test('Delete player operation', async function () {
        let deleteFalse = await deleteUser(test_data[2].username);
        console.log('deleteFalse ->', deleteFalse);
        assert.strictEqual(false, deleteFalse); //The database is empty

        await createUser(test_data[2]);

        var player = await findUser(test_data[2].username);
        console.log('Player ->', player);
        assert.strictEqual(test_data[2].name, player.name); //Some sanity check
        
        var resultOp = await deleteUser(test_data[2].username);
        console.log('resultop ->', resultOp);
        assert.strictEqual(resultOp, true);

        var player = await findUser(test_data[2].username);
        console.log('player ->', player);
        assert.strictEqual(false, player);

        await createUser(test_data[1]);

        var user = await findUser(test_data[1].username);
        console.log('user ->', user);
        assert.strictEqual(test_data[1].name, user.name); //Some sanity check
       
        var resultOp = await deleteUser(test_data[0].username); //This is already gone
        console.log('resultOp ->', resultOp);
        assert.strictEqual(resultOp, false); 
       
        var user = await findUser(test_data[1].username);
        console.log('user ->', user);
        assert.strictEqual(test_data[1].name, user.name);
    });

    test('Deleting user without username provided', async function () {
        assert.rejects(findUser());
    });
});

suite('Security operations', function () {
    before(() => users_init('testStore'))
    after(async function () {
        for (var item in test_data){
            await deleteUser(test_data[item].username);
        }
    });

    test('Authentication Operations', async function () {
        await createUser(test_data[0]);
        await createUser(test_data[1]);

        let authResult1 = await authenticate(test_data[1].username, test_data[2].password);
        console.log('authResult1 ->', authResult1);
        assert.strictEqual(false, authResult1);

        let authResult2 = await authenticate(test_data[0].username, test_data[1].password);
        console.log('authResult2 ->', authResult2);
        assert.strictEqual(false, authResult2);

        let authResult3 = await authenticate(test_data[0].username, test_data[0].password);
        console.log('authResult3 ->', authResult3);
        assert.strictEqual(true, authResult3);

        let authResult4 = await authenticate(test_data[3].username, test_data[1].password);
        console.log('authResult4 ->', authResult4);
        assert.strictEqual(false, authResult4);

        let authResult5 = await authenticate(test_data[2].username, test_data[3].password);
        console.log('authResult5 ->', authResult5);
        assert.strictEqual(false, authResult5);

        let authResult6 = await authenticate(test_data[1].username, test_data[1].password);
        console.log('authResult6 ->', authResult6);
        assert.strictEqual(true, authResult6);
    });

    test('Authentication Operations on error', async function () {
        assert.rejects(authenticate(null, test_data[0].password));
    });
});