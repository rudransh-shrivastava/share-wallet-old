import React from 'react';
import ProfilePic from './ProfilePic';

function UserCard({
  user,
  setAddExpenseWith,
  searchUsersInput,
  filterFetchedFriends,
  searchResultsWrapper,
}) {
  return (
    <div
      className="flex items-center gap-3 p-3 cursor-pointer"
      onClick={(e) => {
        setAddExpenseWith((prev) => {
          return [...prev, user];
        });
        searchUsersInput.current.value = '';
        searchResultsWrapper.current?.classList.remove('hover:flex');
        filterFetchedFriends();
      }}
    >
      <ProfilePic name={user.name} />
      <div>{user.name}</div>
    </div>
  );
}

export default UserCard;
