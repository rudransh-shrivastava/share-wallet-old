import React from 'react';

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
      <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder dark:bg-accentBorder-dark">
        {user.name[0]}
      </div>
      <div>{user.name}</div>
    </div>
  );
}

export default UserCard;
