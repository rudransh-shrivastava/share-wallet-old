import React from 'react';

const DashboardHeading = () => {
  return (
    <div className="flex items-center  p-4">
      <span className="text-xl">Dashboard</span>
      <div className="flex gap-2 ml-auto">
        <button className="bg-accentDark text-white px-4 py-2 rounded-md">
          Add Expense
        </button>
        <button className="bg-accentDark text-white px-4 py-2 rounded-md">
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default DashboardHeading;
