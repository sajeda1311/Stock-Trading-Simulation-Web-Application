# Sprint 2 review

## Objectives
This document aims to serve as a post-mortem exercise on the sprint 2 for our project. It explains in an honest and consice way what went good, what went bad, and what we can learn from this sprint.

It also serves as a small changelog file for *process_model.md*.

## Overview on activities

This section presents an overview of activities performed in order. Sprint part 2 instructions was released by Oct 8.
1. Features analysis - Oct 14 on meeting notes - We analyzed the features through diagrams and prototypes. We had a follow up with a question and answer session with Prof. Brown on Oct 22.
2. We had regular scrum meetings, where we stated we were working on a particular task/feature. There are few to none follow-ups on the tasks. There are mentions on the UML diagrams, testing and pull requests approval.
3. We moved the code pull requests up until nov 6.
4. Panic (just a little bit)

## What works
Feature by feature:
* Register players for the game simulation
    * Tests completed for creating players (Users in this version)
    * Tests completed for finding, authenticating and securing sensitive information (SHA3 on passwords)
    * Basic validation on email, and password/repeat passwords.
* Allow player buy and sell actions at the current NYSE prices
    * The game now allows players to buy and sell stocks at real-time NYSE prices, providing an authentic trading experience. 
* Keep track of each player’s portfolio and its value
    * Players’ portfolios are tracked in real-time, with values updated as stock prices fluctuate to reflect performance accurately.
* Maintain player login and profile information:
    * Login information is managed by expressjs-session library.
* Any other features (e.g. GUI front end) to produce a working game. 

## What does not work
Everything regarding admin tasks:
* Declare a winner at the end of the game
* Admin users that can create games
* Maintain player login and profile information:
   * Missing updates on player (User) data. There is HTML for editing user exists, but it does not perform any change on the data yet. 

More features that were not completed:
* Provide all players a starting cash account in their simulation portfolio.

## Sounds too good? What gives?
For some features to work, we had to change the architecture accordingly. This document provides a glimpse at that, for a more detailed explanation refer to the *architecture.md* document.

## How did we end up in this position?
Let's start by reviewing on the activity timelapse review:

1. 1. The analysis on the features was not complete, we only discussed the interfaces needed and the structure to build it, but not the foundations needed (database structure) nor the priority of any of those features.
    2. We randomly assigned these features to the team members without a thought on the skill needed to build them, nor any thoughts on dependencies.
    3. The features analysis was not done early. It was delayed by a week, and then some remaining questions were cleared by Oct 22.
2. We didn't showcase most of the work done on the meetings. We sometimes mentioned a percentage with no evidence whatsoever.
3. 99% of pull requests, not related to UML designs were created from nov 5. (Slapping flex tape all over the place).

## Course correction
We did ~~some~~ a lot of reflections on the original *process_model.md* file. This document could also be seen as a little changelog for that file. Again, more details on *doc/process_model.md*

Changelog:
* On the scrum meetings goals:
    * Added a rule to include discussion on task progress and to provide evidence on that.
    * Added a rule to ensure there are at least 3 meeting notes per week (prev there were 2 most of the time)
* On the pull request:
    * Added information on early pull requests, tailored to the task/feature's priority.
* On the Kanban board:
    * Added information about feature importance and breakdown into tasks.
* On the issue tracker usage:
    * Added rule to migrate every issue and query from informal chats (WhatsApp/Teams) to Github's issue tracker
* Added the Performance review section:
    * It includes the rules of engagement and structure to create the performance review on each team member.
* Added the Attributions file description
* Added a deliverables section
    * Provides description on what is expected from us at the end of the sprint
    * Add a new deliverable file "sprint_retrospective"
* Update on the classification of means of communication
    * Focus the priority on Issue tracker and Kanban tasks
