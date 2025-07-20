import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import DepositForm from './components/DepositForm';
import Overview from './components/Overview';

function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  // Fetch goals from the API
  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/goals');
      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }
      const data = await response.json();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError('Error fetching goals: ' + err.message);
      console.error('Error fetching goals:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new goal
  const addGoal = async (newGoal) => {
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) {
        throw new Error('Failed to add goal');
      }

      const addedGoal = await response.json();
      setGoals([...goals, addedGoal]);
    } catch (err) {
      setError('Error adding goal: ' + err.message);
      console.error('Error adding goal:', err);
    }
  };

  // Update an existing goal
  const updateGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });

      if (!response.ok) {
        throw new Error('Failed to update goal');
      }

      const updated = await response.json();
      setGoals(goals.map(goal => goal.id === updated.id ? updated : goal));
    } catch (err) {
      setError('Error updating goal: ' + err.message);
      console.error('Error updating goal:', err);
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }

      setGoals(goals.filter(goal => goal.id !== id));
    } catch (err) {
      setError('Error deleting goal: ' + err.message);
      console.error('Error deleting goal:', err);
    }
  };

  // Make a deposit to a goal
  const makeDeposit = async (goalId, amount) => {
    try {
      // Find the goal to update
      const goalToUpdate = goals.find(goal => goal.id === goalId);
      if (!goalToUpdate) {
        throw new Error('Goal not found');
      }

      // Calculate new saved amount
      const newSavedAmount = parseFloat(goalToUpdate.savedAmount) + parseFloat(amount);

      // Update the goal with the new saved amount
      const response = await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedAmount: newSavedAmount }),
      });

      if (!response.ok) {
        throw new Error('Failed to make deposit');
      }

      const updatedGoal = await response.json();
      setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    } catch (err) {
      setError('Error making deposit: ' + err.message);
      console.error('Error making deposit:', err);
    }
  };

  if (loading) {
    return <div className="container mt-5"><div className="alert alert-info">Loading goals...</div></div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Smart Goal Planner</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row mb-4">
        <div className="col-md-12">
          <Overview goals={goals} />
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-8">
          <GoalList 
            goals={goals} 
            onDelete={deleteGoal} 
            onUpdate={updateGoal} 
          />
        </div>
        
        <div className="col-md-4">
          <div className="mb-4">
            <GoalForm onAddGoal={addGoal} />
          </div>
          
          <div>
            <DepositForm goals={goals} onMakeDeposit={makeDeposit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;