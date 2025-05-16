# Code Review Process for Sprint 3

## Overview
The purpose of this document is to outline the **Code Review Process** for the stock trading simulation project. As stated in the *process_model.md* file, it aims to ensure code quality to meet the project requirements. 

## Project Overview
The stock trading simulation application is designed to create a simulated environment where players can trade stocks in real-time, utilizing NYSE prices. The goal for players is to maximize the total value of their portfolio by the end of the simulation. Admin users can create these games, while players' activities are monitored, and the game winner is declared based on who has the highest portfolio balance.

## Features for Sprint 3
- A speed mode setting for a simulation to run at faster than real time using historical stock data. For example, you may want to simulate two years of time in a simulation lasting a day.
- Graphical display of portfolio performance over the simulation
- Google's ReCaptcha integration on the login page.
- Admin dashboard

### Assigned PR Details

- **PR URL**: [Issue #139](https://github.com/CS6905F24/term-project-teamh/pull/139)
- **PR Title**: Derasdelgado sprint3
- **PR Description Highlights**:
  - The new speed mode was called *challenge mode*, can be created from the admin dashboard.
  - Followed code review process during internal meetings
  - Bug detected: *challenge mode* flag was being saved in the database as a string and not as a boolean object.
  - Bugfix released: [Commit](https://github.com/CS6905F24/term-project-teamh/pull/139/commits/23de19aad6ca17302c966c24426032d52cf3fbb9).

## Code Review Guidelines

### **1. Review Scope**
#### Functionality:
- Ensure the feature works as intended (creating a speed-mode-altered portfolio).
- Verify that all features match the PR description and the assigned tasks.

#### Code Quality:
- Check for clean, readable, and well-commented code.
- It should keep standard coding practices such as:
    - Not weird variable names.
    - Function names should describe the functionality.

#### Error Handling:
- Challenge mode not appearing in the admin section nor in the player dashboard. Detected in [commit](https://github.com/CS6905F24/term-project-teamh/pull/139/commits/d73480f305348979f95ead4c2f681715528af508).
``
var activeGame = {"name": games[0].name, "createdAt": dateCreated, "players": games.length, "endingAt": endingTime, "mode": games[0].challenge_mode};
``
Was changed for 
``
var activeGame = {
    "name": games[0].name,
    "createdAt": dateCreated,
    "players": games.length,
    "endingAt": endingTime,
};
``
You can notice the challenge_mode part was dropped in that commit, causing issues further along the feature.

#### Bugfix provided:
- Bugfix released: [Commit](https://github.com/CS6905F24/term-project-teamh/pull/139/commits/23de19aad6ca17302c966c24426032d52cf3fbb9).

#### Test Coverage:
- Ensure that tests are conducted to validate the new features.
- Confirm that existing functionalities remain unaffected.

#### User Interface:
- Ensure that the GUI aligns with design specifications.

#### Collaboration:
- Check integration with Kanban board tasks.
- Confirm clear and actionable documentation in the PR.

## Code Review Workflow

### 1. Preparation
- Read the PR description thoroughly.
- Familiarize yourself with the assigned tasks and the project context.

### 2. Review Process
- Pull the branch locally and test the feature.
- Review the changes line-by-line for quality, logic, and style.
- Cross-check against tasks in the Kanban board.

### 3. Feedback
- Provide constructive feedback through GitHub issue comments.
- Highlight any issues with code quality, errors, or deviations from project standards.
- Suggest actionable changes or improvements.

### 4. Approval
- Approve the PR only when all requirements have been met.
- Confirm with the team during meetings before merging the PR.

## Conclusion
This code review process ensures that all PRs meet quality standards, align with project goals, and integrate seamlessly into the platform. The collaboration among team members is key to refining features and maintaining consistency in the project’s development.

