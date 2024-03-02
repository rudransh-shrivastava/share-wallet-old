import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AddedUserTag from './AddedUserTag';
import UserCard from './UserCard';

function AddExpense() {
  const [addExpenseWith, setAddExpenseWith] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchUsersInput = useRef(null);
  const [searchedFriends, setSearchedFriends] = useState([]);
  const [expenseTime, setExpenseTime] = useState(new Date());

  const [fetchedFriends, setFetchedFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const filterFetchedFriends = (fetchedFriendsArg = null) => {
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

  useEffect(() => {
    fetchFriends({ setFetchedFriends, setLoading, setError });
  }, []);

  useEffect(
    () => filterFetchedFriends(),
    [addExpenseWith, searchQuery, fetchedFriends]
  );

  return (
    <div>
      <form onSubmit={formSubmit}>
        <div className="flex flex-col gap-8">
          <div className="flex gap-2 flex-wrap border-b-2 border-accentBorder relative px-2 group">
            <div className="leading-10">With You and</div>
            <div className="flex flex-wrap">
              {addExpenseWith.map((user) => (
                <AddedUserTag
                  key={user.googleId}
                  id={user.googleId}
                  name={user.name}
                  setAddExpenseWith={setAddExpenseWith}
                />
              ))}
            </div>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full bg-white border-none outline-none p-2 peer"
              value={searchQuery}
              ref={searchUsersInput}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="hidden peer-focus-within:flex focus-within:flex hover:flex flex-col w-full max-h-[50vh] overflow-auto absolute top-full left-0 right-0 bg-white divide-y-2 divide-accentBorder border-2 border-accentBorder px-2 rounded-b-lg">
              {searchedFriends.length ? (
                searchedFriends.map((friend) => (
                  <UserCard
                    key={friend.googleId}
                    user={friend}
                    searchUsersInput={searchUsersInput}
                    setAddExpenseWith={setAddExpenseWith}
                    filterFetchedFriends={filterFetchedFriends}
                  />
                ))
              ) : (
                <div className="p-3 h-12 italic">
                  {error ? "Couldn't fetch friends " : ''}
                  {loading ? 'loading...' : ''}
                  {!loading && !error ? 'No friends found' : ''}
                </div>
              )}
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
  );
}

async function fetchFriends({ setFetchedFriends, setLoading, setError }) {
  try {
    setError(false);
    setLoading(true);
    console.log('before axios');
    const friendIds = await axios.get('http://localhost:3001/user/users', {
      withCredentials: true,
    });
    console.log(friendIds);
    setFetchedFriends(Array.isArray(friendIds) ? friendIds : []);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    setError(true);
    console.log(err);
  }
}

// TODO: Create endpoint for submitting the form
const formSubmit = (e) => {
  e.preventDefault();
  console.log('Form has been submitted!');
};

export default AddExpense;
