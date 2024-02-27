import React, { useState } from 'react';
import usePopup from '../context/popup';
import axios from 'axios';
import UserCard from './UserCard';

// NOTE: this is temporary it's not exactly where this function will live or will it live or not
const getSearchedUsers = (query = '') => {
  const testUser = 'TestUser';
  let userFriends = axios
    .get('http://localhost:3001/friends', {
      params: { testUser },
    })
    .then((res) => {
      userFriends = res.data;
      console.log(userFriends);
    });
  // TODO: Gopal: Return userFriends below, Promise takes time and the below return statement executes, I can't get it working, taking too much time, I'll do something else for now
  return [
    { name: 'John Doe', id: 1 },
    { name: 'Test Doe', id: 2 },
    { name: 'Jane Smith', id: 3 },
    { name: 'Jhonny Doe', id: 4 },
    { name: 'Test Smith', id: 5 },
    { name: 'Ramesh Smith', id: 6 },
    { name: 'Rajendra Doe', id: 7 },
    { name: 'Test Gupta', id: 8 },
    { name: 'Surya', id: 9 },
    { name: 'Ravish', id: 10 },
    { name: 'Rahul', id: 11 },
    { name: 'Rajeev raja', id: 12 },
    { name: 'Raj', id: 13 },
  ].filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
};

function AddExpensePopup() {
  const { setShowAddExpensePopup } = usePopup();
  const [addExpenseWith, setAddExpenseWith] = useState([]);
  const [serachedUsers, setSearchedUsers] = useState([...getSearchedUsers('')]); // TODO: by default it should be some users, may be most frequent or may be all firends
  const [showSearchedUsers, setShowSearchedUsers] = useState(false);
  const [expenseTime, setExpenseTime] = useState(new Date());
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
          <div className="flex flex-col gap-8">
            <div
              className="flex gap-2 flex-wrap border-b-2 border-accentBorder relative px-2"
              onFocus={() => {
                setShowSearchedUsers(true);
              }}
              // NOTE: fix this
              // TODO: fix this I'm sleepy
              // TODO: it's complicated but we need to make sure when we unfocus from input the search reasults hide but if we click on one of the search result it should not hide
              onBlur={(e) => {
                setTimeout(() => {
                  setShowSearchedUsers(false);
                }, 500);
              }}
            >
              <div className="leading-10">With You and</div>
              {/* one line is 2.5rem in height */}
              <div className="flex flex-wrap">
                {addExpenseWith.map((user) => (
                  // may be a separate component later
                  <div
                    className="h-8 m-1 bg-accentBorder flex items-center pl-3 pr-1 rounded-full gap-1"
                    key={user.id}
                  >
                    {user.name}
                    <button
                      className="size-6 bg-white rounded-full relative flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('hii');
                        setAddExpenseWith((addExpenseWith) => {
                          console.log(addExpenseWith);
                          return addExpenseWith.filter((friend) => {
                            return friend.id !== user.id;
                          });
                        });
                      }}
                    >
                      <span className="absolute border border-black rounded-full w-4 rotate-45"></span>
                      <span className="absolute border border-black rounded-full w-4 -rotate-45"></span>
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Enter Name"
                className="bg-white border-none outline-none p-2"
                onChange={(e) => {
                  setSearchedUsers(getSearchedUsers(e.target.value));
                }}
              />
              {showSearchedUsers && (
                <div className="flex flex-col w-full max-h-[50vh] overflow-auto absolute top-full left-0 right-0 bg-white divide-y-2 divide-accentBorder border-2 border-accentBorder px-2 rounded-b-lg">
                  {/* TODO: we need real users here  */}
                  {serachedUsers.length
                    ? serachedUsers
                        .filter((user) => {
                          return !addExpenseWith.find(
                            (addExpenseWithUser) =>
                              addExpenseWithUser.id === user.id
                          );
                        })
                        .map((user) => (
                          <UserCard
                            user={user}
                            setAddExpenseWith={setAddExpenseWith}
                            key={user.id}
                          />
                        ))
                    : 'No Users found'}
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Enter Description"
              className="outline-none w-full border-b-2 border-accentBorder p-2"
            />
            <input
              name="amount"
              type="number"
              placeholder="Enter Amount"
              className="outline-none w-full border-b-2 border-accentBorder p-2 text-center text-xl"
            />
            <div className="px-2">
              Paid by{' '}
              <select name="paidBy" id="paidBy" className="p-2 my-1 mx-2">
                {/* TODO: enter user's id here or however backend says */}
                <option value="you">You</option>
                {addExpenseWith.map((user) => (
                  <option value={user.id} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              and to be
              <select
                name="splitType"
                id="splitType"
                defaultValue="splitEqually"
                className="p-2 my-1 mx-2"
              >
                <option value="splitEqually">Split Equally</option>
                <option value="paidForMe">Paid for Me</option>
                {addExpenseWith.map((user) => (
                  <option value={`paidFor${user.id}`} key={user.id}>
                    Paid for {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-2">{expenseTime.toLocaleString()}</div>
            <button
              type="submit"
              value="Submit"
              className="h-10 w-full rounded-md bg-accentDark text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// TODO: Create endpoint for submitting the form
const formSubmit = (e) => {
  e.preventDefault();
  console.log('Form has been submitted!');
};
export default AddExpensePopup;
