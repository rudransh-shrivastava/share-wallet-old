import React from 'react';

function UserCard({ user, setAddExpenseWith }) {
  return (
    <div
      className="flex items-center gap-3 p-3 cursor-pointer"
      onClick={(e) => {
        setAddExpenseWith((prev) => {
          return [...prev, user];
        });
      }}
    >
      <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
        {user.name[0]}
      </div>
      <div>{user.name}</div>
    </div>
  );
}

export default UserCard;
