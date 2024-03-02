import React, { useState } from 'react';
import { transactions } from '../assets/data.json';

function AddFriend() {
  const [searchQuery, setSearchQuery] = useState('');
  // TODO: Gopal: The /user/users endpoint it working and it retusn an object with {name and googleIds}, use that instead of data.json
  console.log(transactions);
  return (
    <div>
      <input
        type="text"
        placeholder="Search User"
        className="w-full bg-white border-b-2 border-accentBorder outline-none p-2 peer"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="min-h-[20svh] max-h-[50svh] overflow-auto border-2 border-accentBorder rounded-md p-2 mt-4 divide-y-2 divide-accentBorder">
        {transactions.map((transaction, i) => {
          return (
            <div key={transaction.id} className="flex items-center gap-3 p-3">
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
                {transaction.name[0]}
              </div>
              <span>{transaction.name}</span>
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

export default AddFriend;
