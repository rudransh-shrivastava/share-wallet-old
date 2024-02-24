import React from 'react';
import data from '../assets/data.json';

const Overall = () => {
  const { totalBalance, youOwe, youAreOwed } = data.overall;

  return (
    <div className="flex w-full justify-center gap-8">
      <div className="flex flex-col items-center p-4">
        <span>Total Balance</span>
        <span className="text-2xl">+ &#8377;{totalBalance}</span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span>You Owe</span>
        <span className="text-2xl">&#8377;{youOwe}</span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span>You are Owed</span>
        <span className="text-2xl">&#8377;{youAreOwed}</span>
      </div>
    </div>
  );
};

export default Overall;
