import React from 'react';

function AddedUserTag({ id, name, setAddExpenseWith }) {
  return (
    <div
      className="h-8 m-1 bg-accentBorder dark:bg-accentBorder-dark flex items-center pl-3 pr-1 rounded-full gap-1"
      key={id}
    >
      {name}
      <button
        className="size-6 bg-bgPrimary dark:bg-bgPrimary-dark rounded-full relative flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          setAddExpenseWith((addExpenseWith) => {
            return addExpenseWith.filter((friend) => {
              return friend.googleId !== id;
            });
          });
        }}
      >
        <span className="absolute border border-textPrimary dark:border-textPrimary-dark rounded-full w-4 rotate-45"></span>
        <span className="absolute border border-textPrimary dark:border-textPrimary-dark rounded-full w-4 -rotate-45"></span>
      </button>
    </div>
  );
}

export default AddedUserTag;
