import React from 'react';
import { usePopupContext } from '../context/popup';
import AddExpense from './AddExpense';
import ManageFriends from './ManageFriends';

const DashboardHeading = () => {
  const { setShowPopup, setPopupContent, setPopupTitle } = usePopupContext();

  return (
    <div className="flex flex-col sm:flex-row gap-8 sm:gap-2 items-center justify-center p-4 flex-wrap">
      <span className="text-xl">Dashboard</span>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:ml-auto flex-wrap w-full sm:w-auto">
        <button
          className="bg-accent-500 dark:bg-accent-300 hover:bg-accent-400 dark:hover:bg-accent-400 text-textPrimary dark:text-textPrimary-dark px-4 py-2 rounded-md w-full sm:w-auto"
          onClick={() => {
            setPopupTitle('Add Expense');
            setPopupContent(<AddExpense />);
            setShowPopup(true);
          }}
        >
          Add Expense
        </button>
        <button
          className="bg-accent-500 dark:bg-accent-300 hover:bg-accent-400 dark:hover:bg-accent-400 text-textPrimary dark:text-textPrimary-dark px-4 py-2 rounded-md w-full sm:w-auto"
          onClick={() => {
            setPopupTitle('Add Friend');
            setPopupContent(<ManageFriends />);
            setShowPopup(true);
          }}
        >
          Manage Friends
        </button>
      </div>
    </div>
  );
};

export default DashboardHeading;
