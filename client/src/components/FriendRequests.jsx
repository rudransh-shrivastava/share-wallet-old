import React, { useEffect, useState } from 'react';
import { axiosWithCredentials } from '../utils/axiosWithCredentials';
import ProfilePic from './ProfilePic';
import LoadingSpinner from './LoadingSpinner';

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
    <div className="w-full">
      <div className="w-full p-4 border-b-2 border-accentBorder dark:border-accentBorder-dark">
        Friend Requests
      </div>
      <div className="p-4">
        {loadingFriendRequests && <LoadingSpinner />}
        {!loadingFriendRequests &&
          friendRequests.map((friendRequest) => {
            // TODO: make friendId => name
            return (
              <div
                className="flex items-center gap-2"
                key={friendRequest.userId}
              >
                <ProfilePic name={friendRequest.friendId} />
                <span>{friendRequest.friendId}</span>
                <div className="ml-auto gap-2 divide-x-2 divide-accentBorder dark:divide-accentBorder-dark">
                  <button
                    className="bg-accent-500 dark:bg-accent-300 hover:bg-accent-400 dark:hover:bg-accent-400 text-textPrimary dark:text-textPrimary-dark pl-3 pr-2 py-2 rounded-l-full"
                    onClick={() => {
                      axiosWithCredentials({
                        path: '/user/friends/accept',
                      }).then(() => {
                        fetchFriendRequests(
                          setFriendRequests,
                          setLoadingFriendRequests,
                          setErrorFriendRequests
                        );
                      });
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-accent-500 dark:bg-accent-300 hover:bg-accent-400 dark:hover:bg-accent-400 text-textPrimary dark:text-textPrimary-dark pl-2 pr-3 py-2 rounded-r-full"
                    onClick={() => {
                      axiosWithCredentials({
                        path: '/user/friends/reject',
                      }).then(() => {
                        fetchFriendRequests(
                          setFriendRequests,
                          setLoadingFriendRequests,
                          setErrorFriendRequests
                        );
                      });
                    }}
                  >
                    Reject
                  </button>
                </div>
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
