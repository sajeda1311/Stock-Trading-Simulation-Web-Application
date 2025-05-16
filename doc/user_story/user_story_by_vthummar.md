# User Story for Introducing Notification System in Stock Simulation Game 📲

## Persona Definition 👤  
**Sam** is a third-year computer science student learning Java. He enjoys exploring new concepts in game simulations and is actively participating in the stock simulation game created by the admin. 📚🎮

## Scenario or Context 🎯  
An admin has created a stock simulation game and assigned Sam to it. The game is three days long. During the game, players can buy and sell stocks to build their portfolio, with the winner determined by the highest portfolio value at the end of the game. 💼📈

## Interaction Description 🔄  
Sam interacts with the user dashboard daily. He buys and sells stocks through the system, and the system processes these transactions, updating his portfolio accordingly. 💵🔄

## System Response ⚙️  
Whenever Sam buys or sells stocks, the system executes the transaction and reflects the updated portfolio in real time. 📊✅

## Reflection or Outcome 💭  
Sam occasionally forgets to trade during the game due to its length. He feels that notifications could help remind him of important actions, such as:
- The **game start time** ⏰
- The need to **trade daily** 🔄
- The **approaching end time** of the game ⏳

These reminders would ensure consistent participation and avoid missed opportunities. ✅

## Extracted Requirement 📑  
The system should include a **notification feature** that:
- Notifies players at the start of the game 🎮
- Sends reminders during the game to encourage trading activity 💬
- Alerts players as the game approaches the end time 🏁

## Classification 🗂️

### **FURPS**  
- **Functionality:** The system must send notifications at specific milestones (start, mid-game, and end). 🚀
- **Usability:** Notifications should be clear and actionable. ✔️
- **Reliability:** Notifications must be sent consistently and without errors. ⚡
- **Performance:** Notifications should be delivered promptly to avoid delays. ⏳
- **Supportability:** The system should allow customization of notification frequency. ⚙️

### **MOSCOW**  
- **Must-have:** Notifications for game start and end times. 🔔  
- **Should-have:** Mid-game reminders to encourage trading. 🔄  
- **Could-have:** Customizable notifications for users. ⚙️  
- **Won’t-have:** Integration with external systems for notifications in the current version. 🚫
