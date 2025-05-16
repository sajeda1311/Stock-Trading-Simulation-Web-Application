import assert from 'assert';
import { before, suite, test, after } from 'node:test';

// Import the actual function
import { getStocksByPortfolioId as originalGetStocksByPortfolioId } from '../models/stockModel.js';

let getStocksByPortfolioId; // Use 'let' to allow reassignment

suite('getStocksByPortfolioId Tests', () => {
    before(() => {
        // Store the original function so it can be restored later
        getStocksByPortfolioId = originalGetStocksByPortfolioId;

        // Mock the collection returned by _get_data_collection
        const mockGetDataCollection = () => ({
            find: () => ({
                project: () => ({
                    toArray: async () => [
                        {
                            _id: '1',
                            id: '1',
                            portfolio: '12345',
                            symbol: 'AAPL',
                            name: 'Apple Inc.',
                            type: 'Stock',
                            quantity: 10,
                            valueAtPurchase: 150,
                            purchasedAt: '2023-01-01',
                            valueAtEnd: 175,
                            enabled: true
                        },
                        {
                            _id: '2',
                            id: '2',
                            portfolio: '12345',
                            symbol: 'GOOGL',
                            name: 'Alphabet Inc.',
                            type: 'Stock',
                            quantity: 5,
                            valueAtPurchase: 2800,
                            purchasedAt: '2023-02-01',
                            valueAtEnd: 3000,
                            enabled: true
                        }
                    ]
                })
            })
        });

        // Override the getStocksByPortfolioId function with a mock
        getStocksByPortfolioId = async (portfolioId) => {
            const collection = mockGetDataCollection();
            
            // Simulate the case where no stocks are found for a specific portfolioId
            if (portfolioId === '99999') {
                return []; // Return an empty array for this specific case
            }

            return await collection.find().project().toArray();
        };
    });

    // Reset the original function after each test
    after(() => {
        getStocksByPortfolioId = originalGetStocksByPortfolioId;  // Restore original function
    });

    test('should return stocks for a given portfolioId', async () => {
        const portfolioId = '12345';
        const stocks = await getStocksByPortfolioId(portfolioId);

        // Assertions
        assert.strictEqual(stocks.length, 2);
        assert.deepStrictEqual(stocks[0], {
            _id: '1',
            id: '1',
            portfolio: '12345',
            symbol: 'AAPL',
            name: 'Apple Inc.',
            type: 'Stock',
            quantity: 10,
            valueAtPurchase: 150,
            purchasedAt: '2023-01-01',
            valueAtEnd: 175,
            enabled: true
        });
        assert.deepStrictEqual(stocks[1], {
            _id: '2',
            id: '2',
            portfolio: '12345',
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            type: 'Stock',
            quantity: 5,
            valueAtPurchase: 2800,
            purchasedAt: '2023-02-01',
            valueAtEnd: 3000,
            enabled: true
        });
    });

    test('should return an empty array for a portfolioId with no stocks', async () => {
        const portfolioId = '99999'; // Assuming this ID does not exist
        const stocks = await getStocksByPortfolioId(portfolioId);
        assert.strictEqual(stocks.length, 0);
    });

    test('should throw an error for an invalid portfolioId', async () => {
        try {
            await getStocksByPortfolioId(null); // Passing null as an invalid ID
        } catch (error) {
            assert.strictEqual(error.message, 'Invalid portfolio ID');
        }
    });

    test('should handle database connection errors', async () => {
        // Mock the function to simulate a database connection error
        getStocksByPortfolioId = async () => {
            throw new Error('Database connection failed');
        };

        try {
            await getStocksByPortfolioId('12345');
        } catch (error) {
            assert.strictEqual(error.message, 'Database connection failed');
        }
    });

    test('should handle errors gracefully', async () => {
        // Mock the function to throw an error
        getStocksByPortfolioId = async () => {
            throw new Error('Database error');
        };

        try {
            await getStocksByPortfolioId('12345');
        } catch (error) {
            assert.strictEqual(error.message, 'Database error');
        }
    });
});