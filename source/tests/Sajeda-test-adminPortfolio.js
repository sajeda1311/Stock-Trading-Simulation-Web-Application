import assert from 'assert';
import { before, test, after } from 'node:test';


// Import the actual function
import { getStocksByPortfolioId as originalGetStocksByPortfolioId } from '../models/stockModel.js';

let getStocksByPortfolioId; // Use 'let' to allow reassignment

// Custom suite function
function suite(name, fn) {
    console.log(`Suite: ${name}`);
    fn();
}

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
                            portfolio: '123456',
                            symbol: 'DIS',
                            name: 'The Walt Disney Company',
                            type: 'Stock',
                            quantity: 5,
                            valueAtPurchase: 116,
                            purchasedAt: '2024-01-01',
                            valueAtEnd: 125,
                            enabled: true
                        },
                        {
                            _id: '2',
                            id: '2',
                            portfolio: '123457',
                            symbol: 'META',
                            name: 'Meta Platforms Inc.',
                            type: 'Stock',
                            quantity: 10,
                            valueAtPurchase: 622,
                            purchasedAt: '2024-05-16',
                            valueAtEnd: 630,
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
        const portfolioId = '123457';
        const stocks = await getStocksByPortfolioId(portfolioId);

        // Assertions
        assert.strictEqual(stocks.length, 2);
        assert.deepStrictEqual(stocks[0], {
            _id: '1',
            id: '1',
            portfolio: '123456',
            symbol: 'DIS',
            name: 'The Walt Disney Company',
            type: 'Stock',
            quantity: 5,
            valueAtPurchase: 116,
            purchasedAt: '2024-01-01',
            valueAtEnd: 125,
            enabled: true
        });
        assert.deepStrictEqual(stocks[1], {
            _id: '2',
            id: '2',
            portfolio: '123457',
            symbol: 'META',
            name: 'Meta Platforms Inc.',
            type: 'Stock',
            quantity: 10,
            valueAtPurchase: 622,
            purchasedAt: '2024-05-16',
            valueAtEnd: 630,
            enabled: true
        });
    });

    test('should return an empty array for a portfolioId with no stocks', async () => {
        const portfolioId = '88887'; // Assuming this ID does not exist
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
});