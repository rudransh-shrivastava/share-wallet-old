import React, { useEffect, useRef, useState } from 'react';
import AddedUserTag from './AddedUserTag';
import UserCard from './UserCard';
import { usePopupContext } from '../context/popup';
import { axiosWithCredentials } from '../axiosWithCredentials';
import LoadingSpinner from './LoadingSpinner';

function AddExpense() {
  const { setShowPopup } = usePopupContext();
  const closePopup = () => setShowPopup(false);

  const [addExpenseWith, setAddExpenseWith] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchUsersInput = useRef(null);
  const searchResultsWrapper = useRef(null);
  const [searchedFriends, setSearchedFriends] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [paidBy, setPaidBy] = useState('me');
  const [splitType, setSplitType] = useState('equal');
  const [expenseTime, setExpenseTime] = useState(new Date());
  const [submitRes, setSubmitRes] = useState({});
  const [submitResLoading, setSubmitResLoading] = useState(false);
  const [submitResError, setSubmitResError] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const [fetchedFriends, setFetchedFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({});

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
    axiosWithCredentials({
      setData: setFetchedFriends,
      setDataLoading: setLoading,
      setDataError: setError,
      path: '/user/friends',
      method: 'get',
    });
  }, []);

  useEffect(
    () => filterFetchedFriends(),
    [addExpenseWith, searchQuery, fetchedFriends]
  );

  useEffect(() => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        addExpenseWith,
        expenseTime,
        description,
        amount,
        paidBy,
        splitType,
      };
    });
  }, [addExpenseWith, expenseTime, description, amount, paidBy, splitType]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTriedSubmit(true);

          if (
            formData.addExpenseWith.length != 0 &&
            formData.description != '' &&
            formData.amount > 0
          ) {
            formSubmit({
              formData,
              closePopup,
              setSubmitRes,
              setSubmitResLoading,
              setSubmitResError,
            });
          }
        }}
      >
        <div className="flex flex-col gap-8">
          <div className="flex gap-2 flex-wrap border-b-2 border-accentBorder dark:border-accentBorder-dark relative px-2 group">
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
              className="w-full bg-bgPrimary dark:bg-bgPrimary-dark border-none outline-none p-2 peer"
              value={searchQuery}
              ref={searchUsersInput}
              onFocus={() => {
                searchResultsWrapper.current?.classList.add('hover:flex');
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span
              className={`text-red-500 ${
                triedSubmit && addExpenseWith.length == 0 ? 'block' : 'hidden'
              }`}
            >
              *At least on name Required
            </span>
            <div
              className="hidden peer-focus-within:flex focus-within:flex hover:flex flex-col w-full max-h-[50vh] overflow-auto absolute top-full left-0 right-0 bg-bgPrimary dark:bg-bgPrimary-dark divide-y-2 divide-accentBorder dark:divide-accentBorder-dark border-2 border-accentBorder dark:border-accentBorder-dark px-2 rounded-b-lg"
              ref={searchResultsWrapper}
            >
              {searchedFriends.length ? (
                searchedFriends.map((friend) => (
                  <UserCard
                    key={friend.googleId}
                    user={friend}
                    searchUsersInput={searchUsersInput}
                    setAddExpenseWith={setAddExpenseWith}
                    filterFetchedFriends={filterFetchedFriends}
                    searchResultsWrapper={searchResultsWrapper}
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
          <div>
            <input
              type="text"
              placeholder="Enter Description"
              className="outline-none w-full border-b-2 border-accentBorder dark:border-accentBorder-dark p-2 peer/description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span
              className={`text-red-500 ${
                triedSubmit && formData.description == '' ? 'block' : 'hidden'
              }`}
            >
              *Description is Required
            </span>
          </div>
          <div>
            <input
              name="amount"
              type="number"
              placeholder="Enter Amount"
              className="outline-none w-full border-b-2 border-accentBorder dark:border-accentBorder-dark p-2 text-center text-xl"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <span
              className={`text-red-500 ${
                triedSubmit && formData.amount <= 0 ? 'block' : 'hidden'
              }`}
            >
              *Description is Required
            </span>
          </div>
          <div className="px-2">
            Paid by{' '}
            <select
              name="paidBy"
              id="paidBy"
              className="p-2 my-1 mx-2"
              defaultValue={paidBy}
              onChange={(e) => {
                setPaidBy(e.target.value);
              }}
            >
              <option value="me">Me</option>
              {addExpenseWith.map((friend) => (
                <option value={friend.googleId} key={friend.googleId}>
                  {friend.name}
                </option>
              ))}
            </select>
            {/* and to be
            <select
              name="splitType"
              id="splitType"
              defaultValue={setSplitType}
              className="p-2 my-1 mx-2"
              onChange={(e) => {
                setSplitType(e.target.value);
              }}
            >
              <option value="equal">Equal</option>
              <option value="paidForMe">Paid for Me</option>
              {addExpenseWith.map((friend) => (
                <option
                  value={`paidFor${friend.googleId}`}
                  key={friend.googleId}
                >
                  Paid for {friend.name}
                </option>
              ))}
            </select> */}
          </div>
          <div className="px-2">{expenseTime.toLocaleString()}</div>
          <button
            type="submit"
            value="Submit"
            className="h-10 w-full rounded-md bg-accentDark text-bgPrimary"
          >
            {submitResLoading ? <LoadingSpinner /> : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

const formSubmit = ({
  formData,
  closePopup,
  setSubmitRes,
  setSubmitResLoading,
  setSubmitResError,
}) => {
  (async () => {
    try {
      const expenseWith = formData.addExpenseWith
        .map((friend) => friend.googleId)
        .join(',');
      const description = formData.description;
      const amount = formData.amount;
      const paidBy = formData.paidBy;
      const expenseTime = formData.expenseTime;
      await axiosWithCredentials({
        path: `/transaction/create?expenseWith=${expenseWith}&description=${description}&amount=${amount}&paidBy=${paidBy}&expenseTime=${expenseTime}`,
        method: 'get',
        setData: setSubmitRes,
        setDataLoading: setSubmitResLoading,
        setDataError: setSubmitResError,
      });
    } catch (err) {
      console.log(err);
    }
    closePopup();
  })();
};

export default AddExpense;
