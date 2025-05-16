import assert from 'assert';
import { before, suite, test, after } from 'node:test';
import { initStore, createPortfolio, updateFunds, getPlayerPortfolios, deletePortfolio } from "../models/portfolioModel.js"
import { Portfolio } from '../models/portfolioObject.js';

let test_data = [// Adding a portfolio
    {
        id: null,
        owner: 'tester',
        name: "Portfolio testing 1",
        timeLimit: 3, //30 seconds
        createdAt: new Date(),
        funds: 9000,
    },
    {
        id: null,
        owner: 'tester',
        name: "Another test",
        timeLimit: 3600, // an hour
        createdAt: new Date(),
        funds: 18000,
    },
]

suite('Add and get portfolios operations', function () {
    before(() => initStore('testStore'));
    after(async function () {
        var portfolios = await getPlayerPortfolios("tester");
        for (var portfolio in portfolios){
            var item = portfolios[portfolio];
            await deletePortfolio(item.id);
        }
    });

    test('Adding portfolios to the database', async function () {
        for (var portfolio in test_data){
            var item = test_data[portfolio];
            await createPortfolio(new Portfolio(null, item.owner, item.name, item.timeLimit, item.createdAt, item.funds));
        }

        let portfolios = await getPlayerPortfolios('tester');
        //Normally this would be 3, as one is created when user is created but this one is a test user so it is 2.
        assert.strictEqual(2, portfolios.length);
    });
});


suite('Playing with money', function () {
    before(() => initStore('testStore'));
    after(async function () {
        var portfolios = await getPlayerPortfolios("tester");
        for (var portfolio in portfolios){
            var item = portfolios[portfolio];
            await deletePortfolio(item.id);
        }
    });

    test('Adding cash to the portfolio account', async function () {
        await createPortfolio(new Portfolio(null, test_data[0].owner, test_data[0].name,
            test_data[0].timeLimit, test_data[0].createdAt, test_data[0].funds));
        var portfolio = await getPlayerPortfolios("tester");
        var newValue = 50000; //Vegas
        assert.strictEqual(9000, portfolio[0].funds);

        await updateFunds(portfolio[0].id, newValue);
        var portfolio = await getPlayerPortfolios("tester");
        assert.strictEqual(newValue, portfolio[0].funds);
    });

    test('Adding error values for cash', async function () {
        await createPortfolio(new Portfolio(null, test_data[0].owner, test_data[0].name,
            test_data[0].timeLimit, test_data[0].createdAt, test_data[0].funds));
        var portfolio = await getPlayerPortfolios("tester");
        var newValue = "Hello World";
        assert.rejects(updateFunds(portfolio[0].id, newValue));
    });

    test('No value is provided', async function () {
        await createPortfolio(new Portfolio(null, test_data[0].owner, test_data[0].name,
            test_data[0].timeLimit, test_data[0].createdAt, test_data[0].funds));
        var portfolio = await getPlayerPortfolios("tester");
        assert.rejects(updateFunds(portfolio[0].id, null));
    });

    test('Nor ID nor value are provided', async function () {
        await createPortfolio(new Portfolio(null, test_data[0].owner, test_data[0].name,
            test_data[0].timeLimit, test_data[0].createdAt, test_data[0].funds));
        var portfolio = await getPlayerPortfolios("tester");
        assert.rejects(updateFunds(null, null));
    });
});
