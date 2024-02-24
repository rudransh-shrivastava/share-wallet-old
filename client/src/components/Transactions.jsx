import React from 'react';
import Item from './Item';
import data from '../assets/data.json';

const Transactions = () => {
  return (
    <div className="flex divide-x-2 divide-accentBorder">
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder text-center">
          You Owe
        </div>
        <ul className="divide-y-2 divide-accentBorder">
          {data.transactions
            .filter((transaction) => transaction.ownsMoney)
            .map((transaction) => (
              <Item key={transaction.id} transaction={transaction} />
            ))}
        </ul>
      </div>
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder text-center">
          You are Owed
        </div>
        <ul className="divide-y-2 divide-accentBorder">
          {data.transactions
            .filter((transaction) => !transaction.ownsMoney)
            .map((transaction) => (
              <Item key={transaction.id} transaction={transaction} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
