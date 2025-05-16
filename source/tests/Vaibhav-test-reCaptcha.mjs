import assert from 'assert';
import axios from 'axios';

const validToken = '10000000-aaaa-bbbb-cccc-000000000001'; 
const invalidToken = 'INVALID_TEST_TOKEN'; 

// Function to simulate the reCAPTCHA verification API call
async function verifyRecaptcha(token) {
    const secretKey = '6Lfag5EqAAAAADMGsGtXEzvgdRWDXSberKGnpJrX'; 
    const url = 'https://www.google.com/recaptcha/api/siteverify';

    try {
        // Simulate the response based on the token
        const response = token === validToken 
            ? { data: { success: true } } 
            : { data: { success: false, 'error-codes': ['invalid-input-response'] } };

        return response.data; // Return mock response data
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error.message);
        return { success: false, 'error-codes': ['unknown-error'] };
    }
}

// Test valid reCAPTCHA token
async function testValidRecaptcha() {
    console.log('Running testValidRecaptcha...');

    const result = await verifyRecaptcha(validToken);

    // Assert the response for valid token
    assert.strictEqual(result.success, true, 'Expected success for valid token');
    console.log('✔ testValidRecaptcha passed');
}

// Test invalid reCAPTCHA token
async function testInvalidRecaptcha() {
    console.log('Running testInvalidRecaptcha...');

    const result = await verifyRecaptcha(invalidToken);

    // Assert the response for invalid token
    assert.strictEqual(result.success, false, 'Expected failure for invalid token');
    assert.deepStrictEqual(result['error-codes'], ['invalid-input-response'], 'Expected error code invalid-input-response');
    console.log('✔ testInvalidRecaptcha passed');
}

// Run the tests
(async () => {
    try {
        console.log('Starting tests...');
        await testValidRecaptcha();
        await testInvalidRecaptcha();
        console.log('All tests passed!');
    } catch (error) {
        console.error('Test failed:', error.message);
    }
})();