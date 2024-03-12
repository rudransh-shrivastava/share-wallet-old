import React, { useEffect, useState } from 'react';
import { axiosWithCredentials } from '../axiosWithCredentials';
import ProfilePic from './ProfilePic';

function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingFriendRequests, setLoadingFriendRequests] = useState(false);
  const [errorFriendRequests, setErrorFriendRequests] = useState(false);
  useEffect(() => {
    fetchFriendRequests(
      setFriendRequests,
      setLoadingFriendRequests,
      setErrorFriendRequests
    );
  }, []);
  useEffect(() => {
    console.log(friendRequests);
  }, [friendRequests]);
  return (
    <div>
      <div className="p-2 border-b-2 border-accentBorder dark:border-accentBorder-dark">
        Friend Requests
      </div>
      <div className="p-2">
        {friendRequests.map((friendRequest) => {
          // TODO: make friendId => name
          return (
            <div
              className="p-2 flex items-center gap-2"
              key={friendRequest.userId}
            >
              <ProfilePic name={friendRequest.friendId} />
              {friendRequest.friendId}
            </div>
          );
        })}
      </div>
    </div>
  );
}

async function fetchFriendRequests(
  setFriendRequests,
  setLoadingFriendRequests,
  setErrorFriendRequests
) {
  axiosWithCredentials({
    path: '/user/friends/requests',
    setData: setFriendRequests,
    setDataLoading: setLoadingFriendRequests,
    setDataError: setErrorFriendRequests,
  });
}

export default FriendRequests;
