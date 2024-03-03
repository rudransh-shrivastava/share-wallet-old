import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddFriend() {
  const [searchQuery, setSearchQuery] = useState('');
  // TODO: Gopal: The /user/users endpoint it working and it retusn an object with {name and googleIds}, use that instead of data.json

  const [fetchedFriends, setFetchedFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div>
      <form
        action=""
        className="flex"
        onSubmit={(e) => {
          e.preventDefault();
          fetchFriends({ setFetchedFriends, setLoading, setError });
          console.log('fetched friends', fetchedFriends);
          console.log(fetchedFriends);
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
        {error && (
          <div className="p-4 text-center">Something Went Wrong...</div>
        )}
        {loading && <div className="p-4 text-center">Loading...</div>}
        {!error &&
          !loading &&
          fetchedFriends.map((user, i) => {
            return (
              <div key={user.googleId} className="flex items-center gap-3 p-3">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
                  {user.name[0]}
                </div>
                <span>{user.name}</span>
                <button className="ml-auto bg-accentDark text-white px-4 py-2 rounded-md">
                  Add
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

async function fetchFriends({ setFetchedFriends, setLoading, setError }) {
  try {
    setError(false);
    setLoading(true);
    const friendIds = await axios.get('http://localhost:3001/user/users', {
      withCredentials: true,
    });
    setFetchedFriends(Array.isArray(friendIds.data) ? friendIds.data : []);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    setError(true);
    console.log(err);
  }
}

export default AddFriend;
