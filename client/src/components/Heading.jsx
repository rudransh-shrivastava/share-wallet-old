import React from 'react';
import usePopup from '../context/popup';

const DashboardHeading = () => {
  const { setShowAddExpensePopup } = usePopup();
  return (
    <div className="flex items-center  p-4">
      <span className="text-xl">Dashboard</span>
      <div className="flex gap-2 ml-auto">
        <button
          className="bg-accentDark hover:bg-emerald-700 text-white px-4 py-2 rounded-md"
          onClick={() => {
            setShowAddExpensePopup(true);
          }}
        >
          Add Expense
        </button>
        <button className="bg-accentDark hover:bg-emerald-700 text-white px-4 py-2 rounded-md">
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default DashboardHeading;
