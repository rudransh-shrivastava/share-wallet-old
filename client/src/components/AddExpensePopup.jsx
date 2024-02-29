import React, { useEffect, useRef, useState } from 'react';
import usePopup from '../context/popup';
import axios from 'axios';
import UserCard from './UserCard';

function AddExpensePopup() {
  const getSearchedUsers = (query = '') => {
    // NOTE: I tried to implement this for a very long time, i cant do this, please do it
    // TODO: Gopal: see the currentUser below? thats the userId of the currently logged in user, you have to fetch all this friends using /friends with parameter {userId} and then oonce you get all his friends, you have to iterate over each friend and get their details individually using /getDetails, /getDetails requires an ID as the parameter which you will get from /friends, and this /getDetails returns an object with all the details of the user, you have to get their name from this object and create an array like the one below in OLD CODE Section
    // I dont want to spend more time on this, please do it
    // const currentUser = '65dccfbf4044f13cbf65d10f';
    // // TODO: Gopal: Display this data please
    // let userFriends = axios
    //   .post('http://localhost:3001/friends', { currentUser })
    //   .then((res) => {
    //     console.log('Result after /friends: ' + JSON.stringify(res.data));
    //     const friendDetailsPromises = res.data.map((friend) => {
    //       return axios
    //         .post('http://localhost:3001/getDetails', {
    //           friendId: friend.friendId,
    //         })
    //         .then((res) => res.data);
    //     });
    //     console.log('friendDetailsPromises: ', friendDetailsPromises);
    //     return Promise.all(friendDetailsPromises);
    //   })
    //   .then((friendDetails) => {
    //     console.log('Friend details: ' + JSON.stringify(friendDetails));
    //   })
    //   .catch((err) => console.log(err));
    // NOTE: OLD CODE
    // let userFriends = axios
    //   .post('http://localhost:3001/friends', { currentUser })
    //   .then((res) => {
    //     userFriends = res.data;
    //     const searchedFriends = userFriends.filter((user) =>
    //       user.name.toLowerCase().includes(query.toLowerCase())
    //     );
    //     setSearchedUsers(filterSearchedUsers(searchedFriends));
    //   });
  };
  const filterSearchedUsers = (searchedUsers) => {
    return searchedUsers.filter((user) => {
      return !addExpenseWith.find((addExpenseWithUser) => {
        return addExpenseWithUser.id === user.id;
      });
    });
  };
  const searchUsersInput = useRef(null);
  const { setShowAddExpensePopup } = usePopup();
  const [addExpenseWith, setAddExpenseWith] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  useEffect(() => {
    getSearchedUsers(searchUsersInput.current.value);
  }, [addExpenseWith]);
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
            <div className="flex gap-2 flex-wrap border-b-2 border-accentBorder relative px-2 group">
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
                        setAddExpenseWith((addExpenseWith) => {
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
                className="bg-white border-none outline-none p-2 peer"
                ref={searchUsersInput}
                onChange={(e) => {
                  getSearchedUsers(e.target.value);
                }}
              />
              <div className="hidden peer-focus-within:flex focus-within:flex hover:flex flex-col w-full max-h-[50vh] overflow-auto absolute top-full left-0 right-0 bg-white divide-y-2 divide-accentBorder border-2 border-accentBorder px-2 rounded-b-lg">
                {/* TODO: we need real users here  */}
                {searchedUsers.length
                  ? searchedUsers.map((user) => (
                      <UserCard
                        user={user}
                        searchUsersInput={searchUsersInput}
                        setAddExpenseWith={setAddExpenseWith}
                        getSearchedUsers={getSearchedUsers}
                        key={user.id}
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
