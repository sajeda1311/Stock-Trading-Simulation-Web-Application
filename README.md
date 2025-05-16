# Stock Trading Simulation Project Overview  (Sprint 3)

The final sprint aimed to enhance the application by implementing new features, improving existing ones, and refining the overall user experience. 

This project is a **Stock Trading Simulation Game** where users can register, log in, and simulate stock trading activities based on live NYSE prices. Players compete to achieve the highest portfolio value while managing their stocks effectively. The application also supports admin functionalities for game creation and user management.  

At the conclusion of the game, the **admin** is responsible for determining and announcing the winner based on **portfolio performance**.

## **Project Features**  
1. **Player Features:**  
   - Player registration and login functionality.  
   - Buy and sell stocks based on live NYSE prices.  
   - Portfolio management with real-time updates.  
   - Compete for the highest portfolio value among players.  

2. **Admin Features:**  
   - Create and manage trading games.  
   - View player details and performance.  

3. **General:**  
   - User authentication for secure access.  
   - Clear feedback messages for all actions.  

---

## My Assigned Tasks:  

Below are the contributions and features implemented during Sprint 3:

### Existing Feature Improvement: GUI Enhancements 
- **Kanban Card:** [#118](https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=89790346&issue=CS6905F24%7Cterm-project-teamh%7C118)
- **Description:**  
  Several improvements were made to enhance the application's overall look and feel, ensuring a more polished and professional user experience.

### New Feature: Portfolio Performance Visualization 
- **Kanban Card:** [#98](https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=88222276&issue=CS6905F24%7Cterm-project-teamh%7C98)  
- **Description:**  
  Added a graphical display to track portfolio performance over the simulation period using dummy data. This feature helps players monitor their investment progress easily.  

### Sub Feature: Login Page Fixes 
- **Kanban Card:** [#136](https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=90061783&issue=CS6905F24%7Cterm-project-teamh%7C136)
- **Description:**  
  Resolved a design glitch in the Google reCAPTCHA integration on the login page, ensuring seamless display across devices and browsers. 

### Extra Feature: Admin Game Management
- **Kanban Card:** [#135](https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=90056029&issue=CS6905F24%7Cterm-project-teamh%7C135)
- **Description:**  
  Designed a new page where admins can create and configure game instances, streamlining simulation initiation.

---

## **Setup Instructions**  

### **1. Prerequisites**  
Ensure the following are installed on your machine:  
- Node.js (v18 or higher)  
- MongoDB  
- Git  

### **2. Clone the Repository**  
```bash  
git clone 'https://github.com/CS6905F24/term-project-teamh.git'
cd 'source'
```  

### **3. Install Dependencies**  
Run the following command to install all dependencies:  
```bash  
npm install .
```  

### **4. Configure Environment Variables**  
Create a `.env` file in the root directory and add the following:  
```env  
PORT=3000  
MONGODB_URI=mongodb://127.0.0.1:27017/stackGameDB
```  

### **5. Run the Application**  
Start the server by running:  
```bash  
node serve.js  
```  
Access the application at `http://localhost:3000` in your browser.  

---

## **Unit Tests**  

Comprehensive unit tests have been prepared to validate the key functionalities of implemented features. Below are the details:

### **Test 1: Admin Portfolio Feature**  
- **Description:** Verifies functionality for visualizing portfolio performance.  
- **Test File:** `source/tests/Sajeda-test-adminPortfolio.js`  
- **Run Command:**  
  ```bash
  node --test tests/Sajeda-test-adminPortfolio.js
  ```  
- **Result:** Passed successfully.  
- **Screenshot:**  
  ![Test Screenshot](./doc/images/UnitTest-Sajeda-Aaqil's%20Feature.png)

### **Test 2: Portfolio Model Validation**  
- **Description:** Validates portfolio data management logic.  
- **Test File:** `source/tests/Sajeda-test-portfolioModel.js`  
- **Run Command:**  
  ```bash
  node --test tests/Sajeda-test-portfolioModel.js
  ```  
- **Result:** Passed successfully.  
- **Screenshot:**  
  ![Test Screenshot](./doc/images/UnitTest-Sajeda-Vaibhav's%20Feature.png)

---
## **Output**

Below are the some of the screenshots/video that showcase my implementation of assigned tasks:

1. Graphical display of portfolio performance over the duration of the simulation: [Screenshot 1](https://private-user-images.githubusercontent.com/181118984/393467148-8be783c6-6bc0-4e58-b699-937d0ed76bc0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3OTcwNzUsIm5iZiI6MTczMzc5Njc3NSwicGF0aCI6Ii8xODExMTg5ODQvMzkzNDY3MTQ4LThiZTc4M2M2LTZiYzAtNGU1OC1iNjk5LTkzN2QwZWQ3NmJjMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjEwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIxMFQwMjEyNTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xMmExOWIwN2M1NzEyZWFhZTQ3OTU0ZGZkNWVlYTEwZTk1M2FkZmQyZTAzNzY5YzY5ZTg0ZGM3MDliMjM2NDc1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.FsV6bA0fohKcOTjdttDLmdklz7kUg8Q2wSaV4qTLZrE)

2. Working video: https://www.loom.com/share/2e075edf60634e1d926fd9b03da9c2ce?sid=00d25d46-1d83-4ad0-8c91-9ff80c0729ea

3. Create a New Game: [Screenshot 2](https://private-user-images.githubusercontent.com/181118984/393438186-e2ab8d9e-3cc8-43c4-8da5-23a41f03ec04.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3OTcyMDcsIm5iZiI6MTczMzc5NjkwNywicGF0aCI6Ii8xODExMTg5ODQvMzkzNDM4MTg2LWUyYWI4ZDllLTNjYzgtNDNjNC04ZGE1LTIzYTQxZjAzZWMwNC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjEwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIxMFQwMjE1MDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT03M2Y0ZmYwN2RkNTFmNTZmMDBmODJlNTdlMWUxZTIyYzhmZDRkNzE0YzI2NTBmNjJiNzViZDk0MzY5ZjE2MjU5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.nuRGOt3Y5ZZd9YY1lIZQJRlnNgymoZVfyte9eXcSBPY)

4. Google reCaptcha design: [Screenshot 3](https://private-user-images.githubusercontent.com/181118984/393437114-4467def2-9a81-430a-835b-e2b6368eaecb.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3OTcyNTcsIm5iZiI6MTczMzc5Njk1NywicGF0aCI6Ii8xODExMTg5ODQvMzkzNDM3MTE0LTQ0NjdkZWYyLTlhODEtNDMwYS04MzViLWUyYjYzNjhlYWVjYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjEwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIxMFQwMjE1NTdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0yN2IzMDEyZjE3NjRjNWUyYzI2NTdmMTQwZDNmYzhiM2RjMGRkY2RiYjc5ODAxMjZmNjI2Mzc4YWEwNjM1NmJkJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.kzo04cDsx31VDSveCFAUjJPnT-R9ELw_T6qWvvACpqU)

## **Issue Faced**  

### Getting 404 error while calling this API '/api/portfolio-performance'
- **Kanban Card:** [#137](https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=90064279&issue=CS6905F24%7Cterm-project-teamh%7C137)  
- **Description:**  
While implementing my new assigned task, I get a 404 error when calling this API: '/api/portfolio-performance' 
- **Screenshot:** [Error](https://private-user-images.githubusercontent.com/181118984/393467802-be90bf9f-e59b-4fec-a150-46730dcf1995.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzM3OTcwNzUsIm5iZiI6MTczMzc5Njc3NSwicGF0aCI6Ii8xODExMTg5ODQvMzkzNDY3ODAyLWJlOTBiZjlmLWU1OWItNGZlYy1hMTUwLTQ2NzMwZGNmMTk5NS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjEwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIxMFQwMjEyNTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01MDJjZDgxNGJmMTMzZWQ1ZWY5NDU1YzcxNjE3OTU0ODljZGU2ZmYwZjllMmE5ZTM0ZTAxMDg0MjU4MjkwNjIyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.0qkmLnn-wctR2Xt_d_KG0vz-lO3jCCarU-7lWna48nQ)

---

## **Assigned PR Details**  

### **PR Title:** [Sajeda: Implemented existing feature "Improve GUI", Designed 'Create a Game' page, Completed New assigned Feature (#138)](https://github.com/CS6905F24/term-project-teamh/pull/138)  
**Description:**  
This PR includes the below implementation:
- Graphical presentation of Portfolio Performance. 
- Designed 'Create a New Game' page.
- Resolved Google reCaptcha design issue.
- Improved GUI of whole simulation.

---

## **Documentation of Completed Tasks**  

Here is the PR link for the below modifications: https://github.com/CS6905F24/term-project-teamh/pull/140

- **Performance Review:**  
  I have completed the performance review for each team member, including honest feedback and suggestions for improvement.  
  Location: `doc/performance_review/review_by_sajeda.md`  

- **User Story:**  
  I have completed the user story for this project.  
  Location: `doc/user_story/user_story_by_sajeda.md`

- **Code Review:**  
  I have completed the code review for the project, providing feedback on code quality, structure, and optimization suggestions.  
  Location: `doc/code_review/code_review_by_sajeda.md`

- **Attribution:**  
  I have modified the Attribution file by adding extra details for Sprint 3.
  Location: `doc/attribution.md`

### **Evaluation Components**

The following are other documents for Sprint 3 evaluation:

1. **README File:** `README.md`  
2. **Proposal Document:** `doc/proposal.md`  
3. **Updated Architecture Document:** `doc/architecture.md`  
4. **Process Model:** `doc/process_model.md`  
5. **Product Document:** `doc/product.md`  
6. **Scrum Meeting Notes:** `doc/meetingNotes.md`  
7. **Team Profiles:** `doc/team_profiles.md`  
8. **Sprint Retrospective Document:** `doc/sprint_retrospectives/sprint3_review.md`  
9. **jsDocs:** `jsdocs/`  
10. **UML Diagrams:** `doc/UML/`  

---

## **Source Code Structure**

My implementations are in the following directories:

- **Admin Dashboard:** `source/public/adminDashboard.ejs`  
- **Login Page:** `source/public/login.ejs`  
- **Register Page:** `source/public/register.ejs`  
- **Style and Scripts:** `source/public/style.css`, `source/public/chart.js`  
- **Buy/Sell Stocks:** `source/public/buyStocks.ejs`, `source/public/buy-sell.ejs`  
- **Create Game Page:** `source/public/createGame.ejs`    

---

## **GitHub Tools**

1. **GitHub Discussions:** Actively used for team communication.  
2. **Kanban Board:** Tasks managed using a Kanban board for efficient tracking.  
3. **Pull Requests and Reviews:** Reviewed and merged with feedback from the team.  

---

## **Scrum Meetings and Process Documentation**

1. **Meeting Notes:** Detailed notes recorded after each Scrum meeting.  
2. **Scrum Roles:** Rotated roles for Scrum Master and note-taking.  
3. **Process Model:** Updated with PR approvals, code review details, and team performance evaluations.  

---

## **Kanban Board Links**

Below are the additional links to tasks assigned to Sajeda Patel during Sprint 3:  
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=90064279&issue=CS6905F24%7Cterm-project-teamh%7C137
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=89790851&issue=CS6905F24%7Cterm-project-teamh%7C120
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=88223118&issue=CS6905F24%7Cterm-project-teamh%7C106
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=88222766&issue=CS6905F24%7Cterm-project-teamh%7C100
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=88223091&issue=CS6905F24%7Cterm-project-teamh%7C105
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=88223148&issue=CS6905F24%7Cterm-project-teamh%7C107
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=88222864&issue=CS6905F24%7Cterm-project-teamh%7C101
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=90246550&issue=CS6905F24%7Cterm-project-teamh%7C152
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=88222690&issue=CS6905F24%7Cterm-project-teamh%7C99
   - https://github.com/orgs/CS6905F24/projects/2/views/2?filterQuery=assignee%3Asajeda020&pane=issue&itemId=90148821&issue=CS6905F24%7Cterm-project-teamh%7C148

---

## **Final Project Video Demonstration**

Two videos demonstrate the completed features, including player registration, login, stock trading, portfolio tracking, and admin dashboard functionalities:  

1. [Loom Video 1](https://www.loom.com/share/c4ef3d1198834871b523923528fdd88d?sid=55dd11f0-4af8-4a74-9bc6-63546a414c0b)  
2. [Loom Video 2](https://www.loom.com/share/963bcf666f344e04bd30202b2fb50c7c?sid=e5688f98-df81-4a6e-a0b0-0a79512352c7)  

---

## **PR Deadline and Project Submission**

- December 07, 2024, 11:59 pm: Our Team discussed the PR deadline for Sprint 3 and decided internally during the scrum meeting.
- I completed all the major functionalities that assigned to me and created, merged, and closed PRs till December 07, 2024, 11:50 pm. So I successfully followed our internal PR deadline and completed the project on time.
- Update documentation: After December 7th, we updated minor changes in documentation files such as attribution, product, user story, code review, and performance review files in MAIN without creating a PR.
- Our team updated all of the above files together during the team's internal meeting. As we discussed and decided to do it together, we concluded that we don't need PR to update all those documents. That's why we did it after December 7th.
- As a result, I successfully followed all the internal PR deadlines, and software engineering processes, and implemented all the features that were assigned to me.

---

## **Future Enhancements**

1. **Graphical Display of Player's Performance Portfolio Using Real-time Data**  
   - Integrate real-time data feeds from NYSE to display accurate and dynamic portfolio performance.  
   - Enhance visualizations with charts and graphs for tracking stock trends and player progress over time.

2. **Allow More Than Two Players to Compete with Each Other**  
   - Extend the game mechanics to support multiplayer simulations with more than two participants.  
   - Implement dynamic leaderboards to display rankings and foster competitive gameplay.

3. **Provide Additional Features for Players**  
   - Introduce customizable avatars and player profiles for enhanced personalization.  
   - Add advanced trading options, including setting stop-loss and limit orders.  
   - Incorporate in-game tutorials and tips for novice players to improve decision-making skills.  

---

# **Conclusion**  

The completion of Sprint 3 marked a significant milestone in the development of our stock trading simulation project. Key features, including GUI enhancements, graphical portfolio tracking using dummy data, and the creation of an admin page for game configuration, have greatly improved the usability and functionality of the application. Furthermore, resolving the Google reCAPTCHA integration glitch has ensured a seamless user experience across all platforms.  

Collaborative efforts, including unit tests, user stories, performance reviews, and a well-structured README, have solidified the project’s foundation. With robust implementation and attention to detail, the application now offers a refined and professional interface, catering to both players and administrators. The documentation and process updates reflect a commitment to quality and continuous improvement.  

Looking ahead, the proposed enhancements—such as integrating real-time data, expanding multiplayer capabilities, and introducing advanced features for players—promise to make the simulation more dynamic, engaging, and competitive. This project demonstrates the team's dedication to delivering a high-quality software solution and showcases the potential for future growth.