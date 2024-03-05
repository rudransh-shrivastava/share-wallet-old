import React from 'react';
import { usePopupContext } from '../context/popup';
import AddExpense from './AddExpense';
import AddFriend from './AddFriend';

const DashboardHeading = () => {
  const { setShowPopup, setPopupContent, setPopupTitle } = usePopupContext();

  return (
    <div className="flex items-center gap-2 p-4 flex-wrap">
      <span className="text-xl">Dashboard</span>
      <div className="flex gap-2 ml-auto flex-wrap">
        <button
          className="bg-accentDark hover:bg-emerald-700 dark:hover:bg-emerald-500 text-bgPrimary px-4 py-2 rounded-md"
          onClick={() => {
            setPopupTitle('Add Expense');
            setPopupContent(<AddExpense />);
            setShowPopup(true);
          }}
        >
          Add Expense
        </button>
        <button
          className="bg-accentDark hover:bg-emerald-700  dark:hover:bg-emerald-500 text-bgPrimary px-4 py-2 rounded-md"
          onClick={() => {
            setPopupTitle('Add Friend');
            setPopupContent(<AddFriend />);
            setShowPopup(true);
          }}
        >
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default DashboardHeading;
