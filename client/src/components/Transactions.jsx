import React from 'react';
import Item from './Item';
import data from '../assets/data.json';

const Transactions = () => {
  return (
    <div className="flex flex-col lg:flex-row divide-x-2 divide-accentBorder dark:divide-accentBorder-dark divide-y-2">
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
          You Owe
        </div>
        <ul className="divide-y-2 divide-accentBorder dark:divide-accentBorder-dark max-h-[70svh] overflow-auto m-4">
          {data.transactions
            .filter((transaction) => transaction.ownsMoney)
            .map((transaction) => (
              <Item key={transaction.id} transaction={transaction} />
            ))}
        </ul>
      </div>
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
          You are Owed
        </div>
        <ul className="divide-y-2 divide-accentBorder dark:divide-accentBorder-dark max-h-[70svh] overflow-auto p-4">
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
