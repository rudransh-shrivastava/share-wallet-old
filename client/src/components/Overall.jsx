import React from 'react';
import data from '../assets/data.json';
import axios from 'axios';

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

// TODO: Gopal: Load this data everytime the page is loaded
function getUserTotal(user) {
  axios.get('http://localhost:3001/total', { params: { user } }).then((res) => {
    console.log(res);
  });
}
getUserTotal('Gopal');
export default Overall;
