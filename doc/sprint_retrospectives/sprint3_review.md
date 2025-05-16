# Sprint 3 review

## Objectives
This document aims to serve as a post-mortem exercise on the sprint 3 for our project. It explains in an honest but not-so-consice way what went good, what went bad, and what we can learn from this sprint.

It also serves as a small changelog file for *process_model.md*.

## Overview on activities

This section presents an overview of activities performed in order. Sprint part 3 instructions was released by Nov 12.
1. Features analysis - Originally we acknowledged the new features the same day they were released, but it was on Nov 18 (on meeting notes) that we analyzed the scope, sub-tasks and priorities to complete them.
2. We had regular scrum meetings, where we stated we were working on a particular task/feature. There are some follow-ups on the tasks, by the end of November we showed working code. Most of the tasks are focused on pending features that were left behind.
3. We moved the code pull requests up until Dec 7.
4. While there were some hiccups by the end, this time was not so rough as last time. I mean, not only we managed to complete (or mostly complete) the new features, we were able to complete the pending ones as well.

## What works
(This section convers only about this sprint, for a more detail explanation, seek the file *product_doc.md*)

Pending features completed:
* Declare a winner at the end of the game
    * We needed to clear the confussion between games and portfolios, as a team we decided that every game can be represented by a portfolio.
* Admin users that can create games
    * This part was not as hard as we imagined, but the buy/sell stocks was not connected to a game (portfolio), it was connected to the player data, so to fully implement this, we had to change a lot (a lot).
* Provide all players a starting cash account in their simulation portfolio.
    * [IQ Option](https://iqoption.com/en) was used as an inspiration with the $ 10.000 starting player account demo. 
    * A demo portfolio (non-expiring) is created with each player, but the admin user can create more games whenever he/she/it sees fit.
* Admin can declare a winner at the end of a game.

New features completed:
* A speed mode setting for a simulation to run at faster than real time using historical stock data. For example, you may want to simulate two years of time in a simulation lasting a day.
    * The system calls the Polygon API for the stock values from Jan 1st, 2023 onward.
* Re-CAPTCHA system
    * Added to deter bots (and me, as a tester, I cannot stand proving I'm not a bot every 5 minutes) from using the system.
* The admin user can see the player's portfolios performance.

## What does not work
* Graphical display of portfolio performance over the duration of the simulation.
    * This uses dummy data for now.
* A bug was detected for buy/sell stocks before the value from Polygon is fetched [Issue #144](https://github.com/CS6905F24/term-project-teamh/issues/144).
    * This is fixed in derasdelgado-sprint3 branch but there's not pull-request associated as it was discovered after our internal deadline.

## Sounds too good? What gives?
Most of the portfolio/stock objects and their associated controllers (controller and models) were built upon what was existing there at the time (transactions from sprint 2). While everything's working as intended, I still believe it would be best to rework this part of the system completely. To be specific:
* Separate the things performed by the *transactionController.js* file.
    * This controller (and its associated model) should serve as a historical record of the player transactions, not as to keep track of stocks bought and sold.
    * Create a proper controller (and model) for stocks.

This was avoided to not discard most of the work done from sprint 2. Even though some of the *.ejs* files were either heavily edited or discarded to accomodate portfolios and stocks.
I wish I had created more testing cases, I added more during this sprint but I feel they were not enough and too simple (unit testing).

Adapting to the architecture was easier this time, for a more detailed explanation refer to the *architecture.md* document.

## How did we end up in this position?
Let's start by reviewing on the activity timelapse review:
1. 1. We started with a post-mortem of the last sprint, so we had a list of things we had to complete before even attempting to start working on the new features.
   2. We kind of had an idea of the dependencies this time, we also had the scope in mind.
2. We didn't showcase most of the work done on the meetings. We sometimes mentioned a percentage with no evidence whatsoever.
3. We managed to create most of the pull requests during the sprint. But to be honest, I wish there were more.
4. I personally think it was best to discard some of last's sprint implementation to start from scrap. But perhaps at the risk of not finishing on time. (*Trade-off, trade-off,....*)

Something that had a major impact on this sprint was the sprint 2 feedback received, as we got a good grade (on the team part) we stopped feeling like flying without a GPS. However, it relaxed us a little bit too much...

## Process model changes
* Added code review goals and metrics.
    * Focus the priority on Issue tracker and Kanban tasks
