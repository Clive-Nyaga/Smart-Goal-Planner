import React, { useState } from 'react';

function DepositForm({ goals, onMakeDeposit }) {
  const [formData, setFormData] = useState({
    goalId: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form data
    if (!formData.goalId || !formData.amount || parseFloat(formData.amount) <= 0) {
      return;
    }
    
    // Call the onMakeDeposit function passed from the parent component
    onMakeDeposit(formData.goalId, parseFloat(formData.amount));
    
    // Reset the form
    setFormData({
      goalId: '',
      amount: ''
    });
  };

  return (
    <div className="card">
      <div className="card-header bg-info text-white">
        <h3 className="mb-0">Make a Deposit</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="goalId" className="form-label">Select Goal</label>
            <select
              className="form-select"
              id="goalId"
              name="goalId"
              value={formData.goalId}
              onChange={handleChange}
              required
            >
              <option value="">Choose a goal...</option>
              {goals.map(goal => (
                <option key={goal.id} value={goal.id}>
                  {goal.name} ({(goal.savedAmount / goal.targetAmount * 100).toFixed(0)}% complete)
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount ($)</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="e.g., 100"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-info w-100 text-white">Make Deposit</button>
        </form>
      </div>
    </div>
  );
}

export default DepositForm;