import assert from 'assert';
import { before, suite, test, after, afterEach } from 'node:test';
import { users_init, createUser, findUser, deleteUser, authenticate, getEveryoneButUser} from "../controllers/playerController.js"

let test_data = [// Adding a new user
    {
        name: 'Leonardo',
        lastname: "Eras",
        username: 'leras_94',
        password: "sample",
        email: 'leras@mun.ca',
    },
    // Adding another user
    {
        name: 'Marlon',
        lastname: "Arciniegas",
        username: 'marlito',
        password: "strongPass",
        email: 'marlon@mun.ca',
    },
    // Adding another one
    {
        name: 'Ufredo',
        lastname: "Molina",
        username: 'umolina',
        password: "Aqu1t3$t0ngP4$$",
        email: 'umolina@email.com',
    },
]

suite('Add users operations', function () {
    before(() => users_init('testStore'))
    after(async function () {
        for (var item in test_data){
            await deleteUser(test_data[item].username);
        }
    });

    test('Adding users to the database', async function () {
        await createUser(test_data[0]);
        await createUser(test_data[1]);
        await createUser(test_data[2]);

        let user = await findUser(test_data[0].username);
        assert.strictEqual(test_data[0].name, user.name);

    });

    test('Trying to add an already existing one', async function () {
        let repeatedUser = await createUser(test_data[2]);
        assert.strictEqual(false, repeatedUser);
    });
});

suite('Find users operations', function () {
    before(() => users_init('testStore'))
    afterEach(async function () {
        for (var item in test_data){
            await deleteUser(test_data[item].username);
        }
    });

    test('Looking for a user with username provided', async function () {
        await createUser(test_data[1]);

        let user1 = await findUser(test_data[1].username);
        assert.strictEqual(test_data[1].name, user1.name);

        let user2 = await findUser("some imaginary username");
        assert.strictEqual(false, user2);

    });

    test('Getting everyone but second user', async function () {
        var allUsers = await getEveryoneButUser("SomeUniqueNameForThisTest");
        var allUsersCount = allUsers.length; //Starting amount of users
        await createUser(test_data[0]);
        await createUser(test_data[1]);
        await createUser(test_data[2]);

        var allButMe = await getEveryoneButUser(test_data[1].username);
        assert.strictEqual(allButMe.length, allUsersCount + 2);
    });

    test('Looking for user without username provided', async function () {
        assert.rejects(findUser());
    });
});


suite('Delete users operations', function () {
    before(() => users_init('testStore'))
    after(async function () {
        for (var item in test_data){
            await deleteUser(test_data[item].username);
        }
    });

    test('Delete user normal operation', async function () {
        let deleteFalse = await deleteUser(test_data[0].username);
        assert.strictEqual(false, deleteFalse); //The database is empty

        await createUser(test_data[0]);

        var user = await findUser(test_data[0].username);
        assert.strictEqual(test_data[0].name, user.name); //Some sanity check
        var resultOp = await deleteUser(test_data[0].username);
        assert.strictEqual(resultOp, true); 
        var user = await findUser(test_data[0].username);
        assert.strictEqual(false, user);

        await createUser(test_data[1]);

        var user = await findUser(test_data[1].username);
        assert.strictEqual(test_data[1].name, user.name); //Some sanity check
        var resultOp = await deleteUser(test_data[0].username); //This is already gone
        assert.strictEqual(resultOp, false); 
        var user = await findUser(test_data[1].username);
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

        let authResult1 = await authenticate(test_data[0].username, test_data[0].password);
        assert.strictEqual(true, authResult1);
        let authResult2 = await authenticate(test_data[1].username, test_data[1].password);
        assert.strictEqual(true, authResult2);
        let authResult3 = await authenticate(test_data[0].username, test_data[1].password);
        assert.strictEqual(false, authResult3);
    });

    test('Authentication Operations on error', async function () {
        assert.rejects(authenticate(null, test_data[0].password));
    });
});