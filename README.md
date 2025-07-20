# Smart Goal Planner

A React application for managing financial goals, tracking progress, and making deposits.

## Features

- Create, read, update, and delete financial goals
- Track progress for each goal with visual progress bars
- Make deposits to goals
- View overview statistics of all goals
- Sort and filter goals by different criteria
- Deadline tracking with warnings for urgent and overdue goals

## Project Structure

```
smart-goal-planner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── DepositForm.js
│   │   ├── GoalForm.js
│   │   ├── GoalItem.js
│   │   ├── GoalList.js
│   │   └── Overview.js
│   ├── App.js
│   └── index.js
├── db.json
├── package.json
└── README.md
```

## Setup and Running

1. Install dependencies:
   ```
   npm install
   ```

2. Start the JSON server (API):
   ```
   npm run server
   ```

3. In a separate terminal, start the React application:
   ```
   npm start
   ```

4. For development (running both simultaneously):
   ```
   npm run dev
   ```

## API Endpoints

- GET `/goals` - Get all goals
- GET `/goals/:id` - Get a specific goal
- POST `/goals` - Create a new goal
- PATCH `/goals/:id` - Update a goal
- DELETE `/goals/:id` - Delete a goal

## Data Structure

Each goal has the following properties:

- `id`: Unique identifier
- `name`: Name of the goal
- `targetAmount`: Target amount to save
- `savedAmount`: Current amount saved
- `category`: Category of the goal
- `deadline`: Target date to complete the goal
- `createdAt`: Date when the goal was created