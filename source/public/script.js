// Example data for portfolio and transactions
const portfolio = {
    cash: 10000,
    stocks: {
        AAPL: { quantity: 10, price: 150 },
        TSLA: { quantity: 5, price: 700 }
    }
};

const transactions = [
    { type: 'buy', symbol: 'AAPL', quantity: 10, price: 150, date: '2024-11-04' },
    { type: 'sell', symbol: 'GOOGL', quantity: 2, price: 2800, date: '2024-11-03' }
];

// Load portfolio and transactions on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    loadTransactions();
});

// Display portfolio summary
function loadPortfolio() {
    const summaryDiv = document.getElementById('portfolio-summary');
    summaryDiv.innerHTML = `<p>Cash: $${portfolio.cash.toFixed(2)}</p>`;
    for (const [symbol, stock] of Object.entries(portfolio.stocks)) {
        summaryDiv.innerHTML += `<p>${symbol}: ${stock.quantity} shares @ $${stock.price}</p>`;
    }
}

// Display recent transactions
function loadTransactions() {
    const transactionsDiv = document.getElementById('transactions-list');
    transactionsDiv.innerHTML = '';
    transactions.forEach(tx => {
        transactionsDiv.innerHTML += `<p>${tx.date} - ${tx.type.toUpperCase()} ${tx.quantity} shares of ${tx.symbol} @ $${tx.price}</p>`;
    });
}

// Mock trading function
function tradeStock(action) {
    const symbol = document.getElementById('stock-symbol').value.toUpperCase();
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    alert(`${action.toUpperCase()} ${quantity} shares of ${symbol}`);
    // Add trade logic here
}

// Mock logout function
function logout() {
    window.location.href = '/login';
}