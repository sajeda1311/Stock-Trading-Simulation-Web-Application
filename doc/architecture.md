# Design and Implementation Plans

For our project, we have created a document called design.md, which covers both the proposed component architecture and the coding tools that we are expecting to use during the project process. We have divided this document into two main sections: Architecture and Tools and Packages. We decided to divide the work for this assignment, and after discussing it as a team, I have been assigned architecture diagram and Vaibhav will handle the tools and technology part.

### Architecture:

I have prepared general web framework architecture diagram according to our project details. I followed the same structure that were added in the class material. I added/modified the module names and details according to our project and based on the team's discussion. Kindly find the below general web framework architecture diagram: 

![Figure 2.4](images/Architecture.svg)

## Detailed discription:
### app.js (Basic Request Routing and Response Handling)
* The app.js file serves as the central hub for managing basic incoming HTTP requests and directing them to appropriate parts of the application, through the Router module. This file imports or calls on various controllers and logic components to fulfill requests effectively, making it a core component of the application’s request-response cycle. 

### Player Info
* The Player Info component is responsible for storing and managing user types (player or admin), security settings, and login information. This component likely interacts with the session management system to verify user identities and permissions, making it a crucial part of user authentication and data management.

### Session Management
* Session Management is dedicated to handling user sessions, including managing login states, session expiration, and setting maximum time limits for active sessions. It ensures that users stay authenticated for the duration of their session, enforcing automatic logout when the session expires. This component is vital for security, as it helps prevent unauthorized access once a session has ended.
  
### Controller (portfolioController, transactionController, playerController)
* The controller layer comprises specialized controllers such as portfolioController, playerController, and transactionController, which manage specific functionalities of the application. The portfolioController handles operations related to player portfolios, allowing users to view, update, or modify their assets. The transactionController is responsible for managing transactions, enabling players to execute actions like buying or selling assets. The playerController manages login/registration activity, as well as differentiate between regular users (Players) and admin users. These controllers interface with the app logic and data storage layers to execute user requests while adhering to business rules.
  
### Model (TransactionModel, PlayerModel, StockModel)
*All model files serve as interface with the database (MongoDB)*
* The Transaction model defines the schema and data structure for transactions within the application. It establishes rules for how transaction data should be created, validated, and stored, maintaining data integrity. This represent a historic record of the transactions made by the player (buy/sell) stocks.
* The Player model serves as an object-mapping layer, between the database (MongoDB) and the Player object, which stores user-related data. It maps objects in the application to database records, simplifying the process of storing and retrieving data in a structured format.
* The Stock model serves as an object-mapping layer, between the database (MongoDB) and the Stock object. The Stock object has information relevant to be found by Polygon (symbol, name), it stores the market value when bought to calculate a profit or loss whenever is sold.
* The Portfolio model serves as an object-mapping layer, between the database (MongoDB) and the Portfolio object. The Portfolio object represents a game in the project. A player starts with a demo game (a demo portfolio), this is a non expiring portfolio. Everytime an admin wants to create a game, it creates a new portfolio with all rules and players associated. The Portfolio object stores all info relevant to a portfolio, as well as serves as a reference to the stocks. 

### Data Store (MongoDB)
* MongoDB serves as the main database where user data, portfolios, and transaction records are stored. As a NoSQL database, MongoDB is chosen for its flexibility and scalability in handling large volumes of unstructured data, making it ideal for managing diverse user and transaction records in a dynamic environment.

### Routes (playerRoutes, transactionRoutes, portfolioRoutes)
* We created some custom routes to be handled by our modules *playerRoutes*, *transactionRoutes*, or *portfolioRoutes* to best serve their purpose. They capture the HTTP requests instead of app.js, freeing the latter from having to define all routes and logic behind.

### Templating Engine (EJS)
* The Templating Engine, using EJS (Embedded JavaScript), allows for the generation of dynamic HTML templates. EJS enables HTML templates to incorporate JavaScript code, making it possible to render data from the server dynamically on the front end. Working alongside the HTML Construction layer, EJS helps deliver content that updates based on user interactions or data retrieved from the server, enhancing the user experience.

## Tools and Packages: 

I, Vaibhav, am responsible for this section. I’ll list the tools and packages we expect to use in building the project. If we realize we need something additional later, I’ll update this document to reflect that and describe what we’re looking for.

We decided to divide the work for this assignment, and after discussing it as a team, I took on the task of focusing on the tools and technology while Sajeda is working on the architecture diagram.

## Tools and Technology

For our stock trading simulation web application, we plan to use the following technologies:

### Languages:

We'll be working with JavaScript, HTML, and CSS for the main development. JavaScript will control dynamic behaviors on the front-end, while HTML will structure the pages, and CSS will handle the visual styling to make everything look professional and user-friendly.

### Front-end:

We’re going to have both static and dynamic web pages. The static pages will display content that doesn’t need to change often, such as the homepage or game rules. Meanwhile, the dynamic pages will handle things like stock price updates and portfolio changes, using JavaScript to provide users with a smooth, interactive experience.

### Server Environment:

On the server side, we’ll use Node.js. This will allow us to run JavaScript on the server and handle tasks such as responding to user requests and managing data flow between the client and the server.

### Server-side Web Framework:

We’ll be using Express.js as our web framework. Express will help us create routes and manage API requests easily, so we can handle things like buying and selling stocks, and updating user portfolios efficiently.

### Database:

For storing data, we’ll use MongoDB. This database will keep track of user profiles, trading histories, and any other information related to the simulation. It’s a flexible database, so it’ll help us manage data efficiently as the project evolves.

### Code Repository:

Our project’s code will be hosted on GitHub Classroom. This will allow the team to collaborate, track changes, and ensure everyone is working on the latest version of the code.
