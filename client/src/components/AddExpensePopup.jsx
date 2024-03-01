import React, { useEffect, useRef, useState } from 'react';
import usePopup from '../context/popup';
import axios from 'axios';
import UserCard from './UserCard';

function AddExpensePopup() {
  const searchUsersInput = useRef(null);
  const { setShowAddExpensePopup } = usePopup();
  const [addExpenseWith, setAddExpenseWith] = useState([]);
  const [searchedFriends, setSearchedFriends] = useState([]);
  const [fetchedFriends, setFetchedFriends] = useState([]);
  const [expenseTime, setExpenseTime] = useState(new Date());

  useEffect(() => {
    getSearchedUsers();
  }, []);

  useEffect(() => {
    filterFetchedFriends();
  }, [addExpenseWith]);

  const getSearchedUsers = async () => {
    const userFriendIds = await axios.post(
      'http://localhost:3001/user/friends',
      { withCredentials: true }
    );
    const promisesOfFriends = userFriendIds.data.map(async (friend) => {
      const userId = friend.userId;
      const friendDetails = await axios.post(
        'http://localhost:3001/user/details',
        { withCredentials: true }
      );
      return friendDetails.data;
    });
    const fetchedFriends = await Promise.all(promisesOfFriends);
    setFetchedFriends(fetchedFriends);
    filterFetchedFriends('', fetchedFriends);
  };

  const filterFetchedFriends = (searchQuery = '', fetchedFriendsArg = null) => {
    const friendsArray = fetchedFriendsArg || fetchedFriends;
    setSearchedFriends(
      friendsArray.filter(
        (friend) =>
          friend.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !addExpenseWith.find((addExpenseWithFriend) => {
            return addExpenseWithFriend.googleId === friend.googleId;
          })
      )
    );
  };

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
            <div className="flex gap-2 flex-wrap border-b-2 border-accentBorder relative px-2 group">
              <div className="leading-10">With You and</div>
              {/* one line is 2.5rem in height */}
              <div className="flex flex-wrap">
                {addExpenseWith.map((user) => (
                  // may be a separate component later
                  <div
                    className="h-8 m-1 bg-accentBorder flex items-center pl-3 pr-1 rounded-full gap-1"
                    key={user.googleId}
                  >
                    {user.name}
                    <button
                      className="size-6 bg-white rounded-full relative flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault();
                        setAddExpenseWith((addExpenseWith) => {
                          return addExpenseWith.filter((friend) => {
                            return friend.googleId !== user.googleId;
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
                className="bg-white border-none outline-none p-2 peer"
                ref={searchUsersInput}
                onChange={(e) => {
                  filterFetchedFriends(e.target.value);
                }}
              />
              <div className="hidden peer-focus-within:flex focus-within:flex hover:flex flex-col w-full max-h-[50vh] overflow-auto absolute top-full left-0 right-0 bg-white divide-y-2 divide-accentBorder border-2 border-accentBorder px-2 rounded-b-lg">
                {searchedFriends.length
                  ? searchedFriends.map((friend) => (
                      <UserCard
                        user={friend}
                        searchUsersInput={searchUsersInput}
                        setAddExpenseWith={setAddExpenseWith}
                        filterFetchedFriends={filterFetchedFriends}
                        key={friend.googleId}
                      />
                    ))
                  : 'No Users found'}
              </div>
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
                <option value="you">You</option>
                {addExpenseWith.map((friend) => (
                  <option value={friend.googleId} key={friend.googleId}>
                    {friend.name}
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
                {addExpenseWith.map((friend) => (
                  <option
                    value={`paidFor${friend.googleId}`}
                    key={friend.googleId}
                  >
                    Paid for {friend.name}
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
