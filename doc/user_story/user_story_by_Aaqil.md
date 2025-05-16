# User Stories for Admin Dashboard and Player Investments (Saabbas)

## 1. Admin Dashboard: View All Portfolios

**Title**: View All Player Portfolios  
**As an** Admin,  
**I want to** view a list of all portfolios,  
**So that** I can monitor the portfolios of all players, including details like the owner's name, portfolio name, funds, and creation date.

### Acceptance Criteria:
- The portfolio table must display the following columns: Owner, Portfolio Name, Funds, Created At.
- The portfolio data must be dynamically loaded and up-to-date.
- Each row should represent one portfolio, and all portfolios should be listed.



## 2. Admin Dashboard: View Player Investments

**Title**: View Detailed Player Investments  
**As an** Admin,  
**I want to** view detailed information about a player’s investments,  
**So that** I can assess their portfolio holdings and transaction history.

### Acceptance Criteria:
- Clicking the "View Investments" button for a portfolio should redirect to a separate page showing that portfolio’s active holdings and sold stocks.
- The page should display active holdings with details like stock symbol, quantity, value at purchase, and the date purchased.
- The page should also display sold stocks, including stock name, amount sold, total sold value, transaction type, and sale date.



## 3. Admin Dashboard: Dynamic Portfolio Data Loading

**Title**: Dynamic Portfolio Data Display  
**As an** Admin,  
**I want to** see the most up-to-date portfolio information,  
**So that** I don’t need to refresh the page manually to view the latest data.

### Acceptance Criteria:
- The portfolio data should be loaded dynamically through an API request when the page loads.
- If any portfolio is updated, the data should reflect changes without the need for page refresh.



## 4. Player Investments Page: View Active Holdings

**Title**: View Active Holdings  
**As an** Admin,  
**I want to** view a table of active holdings for each portfolio,  
**So that** I can see which stocks the player currently owns and their details.

### Acceptance Criteria:
- The active holdings table should show the stock’s symbol, name, quantity, value at purchase, and the date of purchase.
- The active holdings should be visually separated from sold stocks (e.g., using different background colors).



## 5. Player Investments Page: View Sold Stocks

**Title**: View Sold Stocks  
**As an** Admin,  
**I want to** view a list of sold stocks for each portfolio,  
**So that** I can track the player's past transactions.

### Acceptance Criteria:
- The sold stocks table should show the stock name, amount sold, total sold value, transaction type (e.g., sell), and the date of the transaction.
- The "Sold Stocks" section should have a different background color to distinguish it from active holdings.



## 6. Admin Dashboard: Navigation to Portfolio

**Title**: Navigate to Player Portfolio  
**As an** Admin,  
**I want to** easily navigate between the Admin Dashboard and the Player Investments page,  
**So that** I can seamlessly view and manage portfolios.

### Acceptance Criteria:
- There should be a clear link to "Back to Dashboard" from the Player Investments page.
- The link should correctly redirect to the Admin Dashboard without errors.



## 7. General User Interface

**Title**: Clear Data Differentiation  
**As an** Admin,  
**I want to** easily differentiate between active holdings and sold stocks,  
**So that** I can quickly interpret the portfolio data.

### Acceptance Criteria:
- Active holdings and sold stocks should be visually separated with distinct background colors (e.g., light green for active, light red for sold).
- The data should be presented in a clean, readable table format.



## 8. General System Functionality

**Title**: Smooth Navigation and Interaction  
**As an** Admin,  
**I want to** interact with the system without delays or errors,  
**So that** I can manage portfolios and investments efficiently.

### Acceptance Criteria:
- All pages must load quickly, and navigation should be smooth with no errors during data transitions.
- Data should be presented in a user-friendly layout that is easy to read and navigate.

