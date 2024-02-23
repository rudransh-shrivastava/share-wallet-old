import React from 'react';
import Item from './Item';

const Transactions = () => {
  return (
    <div className="flex divide-x-2 divide-accentBorder">
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder text-center">
          You Owe
        </div>
        <ul className="divide-y-2 divide-accentBorder">
          <Item /> <Item /> <Item /> <Item />
        </ul>
      </div>
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder text-center">
          You are Owed
        </div>
        <ul className="divide-y-2 divide-accentBorder">
          <Item /> <Item /> <Item /> <Item />
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
