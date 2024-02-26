import React from 'react';
import usePopup from '../context/popup';
import axios from 'axios';

function AddExpensePopup() {
  const { setShowAddExpensePopup } = usePopup();
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={() => {
          setShowAddExpensePopup(false);
        }}
      ></div>
      <div className="absolute bg-white border-2 border-accentBorder rounded-md w-full sm:max-w-lg">
        <div className="p-4 flex items-center justify-between w-full">
          <span>Add an Expense</span>
          <button
            className="h-8 w-8 flex items-center justify-center relative"
            onClick={() => {
              setShowAddExpensePopup(false);
            }}
          >
            <span className="bg-gray-700 h-1 w-8 absolute rotate-45 rounded-full"></span>
            <span className="bg-gray-700 h-1 w-8 absolute -rotate-45 rounded-full"></span>
          </button>
        </div>
        <form onSubmit={formSubmit} className="p-4">
          With You and{' '}
          <input
            type="text"
            placeholder="Enter Name"
            className="bg-white border-2 border-accentBorder rounded-sm"
          />{' '}
          <input
            type="text"
            placeholder="Enter Description"
            className="bg-white border-2 border-accentBorder rounded-sm"
          />
          <input
            name="amount"
            type="number"
            placeholder="Enter Amount"
            className="bg-white border-2 border-accentBorder rounded-sm"
          />
          <button
            type="submit"
            value="Submit"
            className="h-8 w-8 flex items-center justify-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// TODO: Temporary testing function to make a request to /submit that sends the amount to the server and the server to the database
const formSubmit = (e) => {
  e.preventDefault();
  const amountValue = e.target.elements.amount.value;
  console.log(amountValue);
  axios
    .post('http://localhost:3001/submit', {
      amount: amountValue,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
export default AddExpensePopup;
