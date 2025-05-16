# Code Review Process

## Overview
This document outlines the code review process for the stock trading simulation project. The purpose of this process is to ensure code quality, maintain consistency, and meet project requirements. It provides guidance for reviewing pull requests (PRs) and collaborating effectively as a team.

---

## Project Details

### Summary
The stock trading simulation project is a web application where players compete in a simulated trading environment using real-time NYSE prices. Players aim to maximize their portfolio’s value by the end of the simulation. Admins manage games, configure settings, and monitor player activities through an admin dashboard.

### Relevant Features for Sprint 3

- **Existing Feature**: Improve GUI
- **New Feature**: Graphical display of portfolio performance over the simulation
- **Bug Fix**: Google reCAPTCHA design glitch
- **Sub Feature**: Design "Create Game" page

### Assigned PR Details

- **PR URL**: [#138](https://github.com/CS6905F24/term-project-teamh/pull/138)
- **PR Title**: Sajeda: Implemented existing feature "Improve GUI," designed 'Create a Game' page, and completed new assigned feature
- **PR Description Highlights**:
  - Features were implemented using dummy data due to a 404 error on the API.
  - GUI and features tested internally during team meetings.
  - Followed code review process during internal meetings.
  - Future improvement plans include real-time data integration.

---

## Code Review Guidelines

### Review Scope
1. **Functionality**:
   - Ensure the feature works as intended (e.g., GUI displays correctly, dummy data integration is functional).
   - Verify that the implementation matches the PR description and assigned task.

2. **Code Quality**:
   - Check for clean, readable, and well-commented code.
   - Ensure adherence to project coding standards.

3. **Error Handling**:
   - Confirm appropriate handling of edge cases.
   - Validate fallback mechanisms for unavailable API data.

4. **Test Coverage**:
   - Verify testing for the newly added features.
   - Confirm existing functionalities are unaffected.

5. **User Interface**:
   - Ensure alignment with the design specifications.
   - Confirm GUI responsiveness and usability across devices.

6. **Collaboration**:
   - Validate PR integration with the Kanban board tasks.
   - Check for clear and actionable documentation in the PR.

### Code Review Workflow
1. **Preparation**:
   - Read the PR description thoroughly.
   - Familiarize yourself with the assigned tasks and context.

2. **Review Process**:
   - Pull the branch locally and test the feature.
   - Review changes line-by-line in the code for quality, logic, and style.
   - Use the Kanban board tasks to cross-check completion of requirements.

3. **Feedback**:
   - Provide constructive feedback through GitHub comments.
   - Highlight code improvements, errors, or deviations from standards.
   - Suggest actionable changes or enhancements if needed.

4. **Approval**:
   - Approve the PR only if all requirements are met.
   - Confirm with the team during meetings before merging.

### PR-specific Notes
For PR #138:
- Dummy data implementation for testing was necessary due to API limitations.
- Ensure GUI improvements and the "Create Game" page design meet functional requirements.
- Confirm team-approved fixes and tests were implemented as discussed during meetings.

---

## Code Review Checklist Prepared for TEAM after creating a PR: 

### General
- [ ] Is the code well-documented and easy to understand?
- [ ] Are variable names descriptive and meaningful?
- [ ] Does the code follow project coding standards?

### Functionality
- [ ] Does the feature meet its requirements?
- [ ] Does the code handle edge cases appropriately?
- [ ] Are all dependencies correctly integrated?

### Testing
- [ ] Are existing functionalities unaffected by the changes?
- [ ] Were unit tests or manual tests conducted for the new feature?
- [ ] Are test results documented?

### Collaboration
- [ ] Is the PR description clear and detailed?
- [ ] Are linked tasks on the Kanban board marked as complete?
- [ ] Have all reviewers approved the PR?

### PR-Specific Collaboration
- [ ] Was the code reviewed in an internal team meeting?
- [ ] Did the team confirm code quality and implementation alignment?
- [ ] Were all issues identified in the meeting addressed and resolved?

---

## Code Review Checklist Answers by TEAM:

### General
- [x] Code was presented and reviewed during the internal team meeting.
- [x] Code is well-documented, with clear comments and appropriate use of JSDoc.
- [x] Variable names are descriptive, meaningful, and adhere to naming conventions.
- [x] The code aligns with established project coding standards.

### Functionality
- [x] The following functionalities were completed successfully:
  1. Existing Feature: Improve GUI.
  2. New Feature: Graphical display of portfolio performance over the simulation.
  3. Bug Fix: Google reCAPTCHA design glitch.
  4. Sub Feature: Design the "Create Game" page.
- [x] Features meet the specified requirements and work as intended.
- [x] Edge cases are handled correctly.
- [x] Dependencies are correctly integrated and tested.

### Testing
- [x] Code changes were tested during the internal team meeting.
- [x] Both new features and existing functionalities were verified for correctness.
- [x] Unit tests or manual tests were conducted for the new implementations.
- [x] Test results are documented for transparency.

### Collaboration
- [x] The team collaborated during scrum meetings, class meetings, and via Microsoft Teams chat group.
- [x] Updates were consistently shared on the Kanban board.
- [x] The PR description is clear and provides sufficient details.
- [x] The team ensured all relevant Kanban board tasks were marked as complete.
- [x] All team members reviewed the PR and approved it during the internal discussion meeting.

### PR-Specific Collaboration
- [x] Code was reviewed and discussed following the code review process suggested by Professor Brown.
- [x] Team members joined an internal discussion meeting to evaluate the PR.
- [x] Feedback provided during the meeting was addressed and incorporated into the final PR.
- [x] The PR was approved unanimously by the team.

--- 

## Notes on Future Improvements

- Replace dummy data with real-time API integration once the 404 error is resolved.
- Enhance graphical elements for portfolio performance to improve user experience.
- Address additional feedback on GUI responsiveness in follow-up sprints.

---