import assert from 'assert';
import { before, suite, test, after } from 'node:test';
import { users_init, createUser, findUser, deleteUser, authenticate } from "../playerRegistration.mjs";

let test_data = [
    // Adding a new user
    {
        name: 'Vaibhav',
        lastname: "Thummar",
        username: 'vaibhav02',
        password: "trytest",
        email: 'try@mun.ca',
    },
    // Adding another user
    {
        name: 'first',
        lastname: "second",
        username: 'testdata12',
        password: "strong21",
        email: 'testing@mun.ca',
    }
];

/**
 * Test suite for User Operations, including registration, retrieval, and authentication functions.
 *
 * This suite tests positive and negative scenarios for user management.
 *
 * @suite User Operations
 */
suite('User Operations', function () {
    before(() => users_init('testStore'));
    after(async function () {
        // Clean up the test database
        for (const item of test_data) {
            await deleteUser(item.username);
        }
    });

    test('Register a new user (Positive)', async function () {
        const result = await createUser(test_data[0]);
        assert.strictEqual(result.name, test_data[0].name); // Check if user was added successfully
    });

    test('Try to register the same user again (Negative)', async function () {
        const result = await createUser(test_data[0]); // Attempt to add the same user
        assert.strictEqual(result, false); // Expecting false since the user already exists
    });

    test('Retrieve an existing user (Positive)', async function () {
        await createUser(test_data[1]); // Ensure the user exists before retrieving
        const user = await findUser(test_data[1].username);
        assert.strictEqual(user.name, test_data[1].name); // Check if the retrieved user matches
    });

    test('Retrieve a non-existent user (Negative)', async function () {
        const user = await findUser("non_existent_username"); // Searching for a user that doesn't exist
        assert.strictEqual(user, false); // Expecting false since the user doesn't exist
    });

    test('Authenticate with correct credentials (Positive)', async function () {
        await createUser(test_data[0]); // Ensure the user exists for authentication
        const authResult = await authenticate(test_data[0].username, test_data[0].password);
        assert.strictEqual(authResult, true); // Expecting true since credentials are correct
    });

    test('Authenticate with incorrect credentials (Negative)', async function () {
        const authResult = await authenticate(test_data[0].username, "wrongPassword");
        assert.strictEqual(authResult, false); // Expecting false since password is incorrect
    });

    test('Authentication error handling (Negative)', async function () {
        assert.rejects(authenticate(null, test_data[0].password)); // Expecting a rejection for null username
    });
});
