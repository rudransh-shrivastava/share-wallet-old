import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddFriend() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState({
    data: [],
    loading: false,
    error: false,
  });
  const [fetchedData, setFetchedData] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [fetchedFriends, setFetchedFriends] = useState({});

  const filterUsers = () => {
    setFilteredUsers(
      fetchedUsers.data.filter((user) => {
        return (
          !fetchedFriends.data.find((friend) => {
            return friend.googleId === user.googleId;
          }) && user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    );
  };

  const fetchData = () => {
    setFetchedData(false);
    const fetchPromises = [
      fetchUsers(setFetchedUsers),
      fetchFriends(setFetchedFriends),
    ];
    Promise.all(fetchPromises).then(() => setFetchedData(true));
  };

  useEffect(fetchData, []);

  useEffect(() => {
    if (fetchedData) filterUsers();
  }, [fetchedData]);

  useEffect(() => {
    filterUsers();
  }, [searchQuery]);

  return (
    <div>
      <form
        action=""
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          fetchUsers(setFetchedUsers);
        }}
      >
        <input
          type="text"
          placeholder="Search User"
          className="w-full bg-white border-b-2 border-accentBorder outline-none p-2 peer"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="size-10 shrink-0" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="40"
            viewBox="0 -960 960 960"
            width="40"
          >
            <path d="M792-120.667 532.667-380q-30 25.333-69.64 39.666Q423.388-326 378.667-326q-108.441 0-183.554-75.167Q120-476.333 120-583.333T195.167-765.5q75.166-75.167 182.5-75.167 107.333 0 182.166 75.167 74.834 75.167 74.834 182.267 0 43.233-14 82.9-14 39.666-40.667 73l260 258.667-48 47.999ZM378-392.666q79.167 0 134.583-55.834Q568-504.333 568-583.333q0-79.001-55.417-134.834Q457.167-774 378-774q-79.722 0-135.528 55.833t-55.806 134.834q0 79 55.806 134.833Q298.278-392.666 378-392.666Z" />
          </svg>
        </button>
      </form>
      <div className="min-h-[20svh] max-h-[50svh] overflow-auto border-2 border-accentBorder rounded-md p-2 mt-4 divide-y-2 divide-accentBorder">
        {(fetchedUsers.error || fetchedFriends.error) && (
          <div className="p-4 text-center">Something Went Wrong...</div>
        )}
        {(fetchedUsers.loading || fetchedFriends.loading) && (
          <div className="p-4 text-center">Loading...</div>
        )}
        {!fetchedUsers.error &&
          !fetchedUsers.loading &&
          filteredUsers.map((user) => {
            return (
              <div key={user.googleId} className="flex items-center gap-3 p-3">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
                  {user.name[0]}
                </div>
                <span>{user.name}</span>
                <button
                  className="ml-auto bg-accentDark text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    addFriend(user.googleId).then(() => {
                      fetchData();
                    });
                  }}
                >
                  Add
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

async function fetchUsers(setFetchedUsers) {
  try {
    setFetchedUsers((prevFetchedUsers) => {
      return { ...prevFetchedUsers, loading: true, error: false };
    });
    const friends = await axios.get('http://localhost:3001/user/users', {
      withCredentials: true,
    });
    const data = Array.isArray(friends?.data) ? friends.data : [];
    console.log('fetching users gives: ', data);

    setFetchedUsers((prevFetchedUsers) => {
      return { ...prevFetchedUsers, loading: false, error: false, data };
    });
  } catch (err) {
    setFetchedUsers((prevFetchedUsers) => {
      return { ...prevFetchedUsers, loading: false, error: true };
    });
    console.log(err);
  }
}

async function fetchFriends(setFetchedFriends) {
  try {
    setFetchedFriends((prevFetchedFriends) => {
      return { ...prevFetchedFriends, loading: true, error: false };
    });
    const friends = await axios.get('http://localhost:3001/user/friends', {
      withCredentials: true,
    });
    console.log('fetching friends gives: ', friends.data);
    const data = Array.isArray(friends?.data) ? friends.data : [];
    setFetchedFriends((prevFetchedFriends) => {
      return { ...prevFetchedFriends, loading: false, error: false, data };
    });
  } catch (err) {
    setFetchedFriends((prevFetchedFriends) => {
      return { ...prevFetchedFriends, loading: false, error: true };
    });
    console.log("it's an error: ", err);
  }
}

async function addFriend(friendId) {
  console.log('trying to add', friendId);
  try {
    const addFriendRes = await axios.get(
      `http://localhost:3001/user/friends/add?friendId=${friendId}`,
      {
        withCredentials: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export default AddFriend;
