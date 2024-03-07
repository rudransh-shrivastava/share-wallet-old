import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
const REACT_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

function ManageFriends() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [fetchedUsersLoading, setFetchedUsersLoading] = useState(false);
  const [fetchedUsersError, setFetchedUsersError] = useState(false);

  useEffect(() => {
    fetchUsers2(setFetchedUsers, setFetchedUsersLoading, setFetchedUsersError);
  }, []);

  return (
    <div>
      <form
        action=""
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search User"
          className="w-full bg-bgPrimary dark:bg-bgPrimary-dark border-b-2 border-accentBorder dark:border-accentBorder-dark outline-none p-2 peer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="size-10 shrink-0" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
            className="fill-textPrimary dark:fill-textPrimary-dark"
          >
            <path d="M792-120.667 532.667-380q-30 25.333-69.64 39.666Q423.388-326 378.667-326q-108.441 0-183.554-75.167Q120-476.333 120-583.333T195.167-765.5q75.166-75.167 182.5-75.167 107.333 0 182.166 75.167 74.834 75.167 74.834 182.267 0 43.233-14 82.9-14 39.666-40.667 73l260 258.667-48 47.999ZM378-392.666q79.167 0 134.583-55.834Q568-504.333 568-583.333q0-79.001-55.417-134.834Q457.167-774 378-774q-79.722 0-135.528 55.833t-55.806 134.834q0 79 55.806 134.833Q298.278-392.666 378-392.666Z" />
          </svg>
        </button>
      </form>
      <div className="min-h-[20svh] max-h-[50svh] overflow-auto border-2 border-accentBorder dark:border-accentBorder-dark rounded-md p-2 mt-4 divide-y-2 divide-accentBorder dark:divide-accentBorder-dark">
        {fetchedUsersError && (
          <div className="p-4 text-center">Something Went Wrong...</div>
        )}
        {fetchedUsersLoading && (
          <div className="p-4 text-center">Loading...</div>
        )}
        {!fetchedUsersError &&
          !fetchedUsersLoading &&
          fetchedUsers.map((user) => {
            if (!user.name.toLowerCase().includes(searchQuery.toLowerCase()))
              return null;
            return (
              <div key={user.googleId} className="flex items-center gap-3 p-3">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder dark:bg-accentBorder-dark">
                  {user.name[0]}
                </div>
                <span>{user.name}</span>
                <button
                  className="ml-auto bg-accentDark text-bgPrimary px-4 py-2 rounded-md"
                  onClick={async () => {
                    setFetchedUsers((prevFetchedUsers) =>
                      prevFetchedUsers.map((fetchedUser) => ({
                        ...fetchedUser,
                        isLoading: fetchedUser.googleId === user.googleId,
                      }))
                    );
                    user.isFriend
                      ? await removeFriend(user.googleId)
                      : await addFriend(user.googleId);
                    fetchUsers2(
                      setFetchedUsers,
                      setFetchedUsersLoading,
                      setFetchedUsersError,
                      false
                    );
                  }}
                >
                  {user.isLoading && <LoadingSpinner />}
                  {!user.isLoading && (user.isFriend ? 'Remove' : 'Add')}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

async function fetchUsers2(
  setFetchedUsers,
  setFetchedUsersLoading,
  setFetchedUsersError,
  showLoading = true
) {
  try {
    setFetchedUsersLoading(showLoading && true);
    setFetchedUsersError(false);
    const usersPromise = axios.get(`${REACT_APP_SERVER_URL}/user/users`, {
      withCredentials: true,
    });
    const friendsPromise = axios.get(`${REACT_APP_SERVER_URL}/user/friends`, {
      withCredentials: true,
    });
    const currentUserPromise = axios.get(
      `${REACT_APP_SERVER_URL}/user/details`,
      {
        withCredentials: true,
      }
    );
    const [users, friends, currentUser] = await Promise.all([
      usersPromise,
      friendsPromise,
      currentUserPromise,
    ]);
    const filteredUsers = users.data.filter((user) => {
      user.isFriend = friends.data.some(
        (friend) => friend.googleId === user.googleId
      );
      user.isLoading = false;
      return user.googleId !== currentUser.data[0].googleId;
    });
    setFetchedUsers(filteredUsers);
    setFetchedUsersLoading(false);
  } catch (err) {
    console.log(err);
    setFetchedUsersLoading(false);
    setFetchedUsersError(true);
  }
}

async function addFriend(friendId) {
  try {
    const addFriendRes = await axios.get(
      `${REACT_APP_SERVER_URL}/user/friends/add?friendId=${friendId}`,
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

async function removeFriend(friendId) {
  try {
    const removeFriendRes = await axios.get(
      `${REACT_APP_SERVER_URL}/user/friends/remove?friendId=${friendId}`,
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export default ManageFriends;
