import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import LoadingSpinner from './LoadingSpinner';

const Transactions = ({ transactions, transactionLoading }) => {
  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  const [showDetailsOwesId, setShowDetailsOwesId] = useState(null);
  const [showDetailsOwedId, setShowDetailsOwedId] = useState(null);
  return (
    <div className="flex flex-col lg:flex-row lg:divide-x-2 lg:divide-y-0 divide-accentBorder dark:divide-accentBorder-dark divide-y-2">
      <div className="w-full">
        <div className="w-full py-4 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
          You are Owed
        </div>
        <ul className="divide-y-2 divide-accentBorder dark:divide-accentBorder-dark max-h-[70svh] overflow-auto m-4">
          {transactionLoading && <LoadingSpinner />}
          {!transactionLoading &&
            transactions
              .filter((transaction) => transaction.owesMoney)
              .map((transaction, index) => (
                <TransactionItem
                  key={transaction.transactionId + `${index}`}
                  id={transaction.transactionId + `${index}`}
                  transaction={transaction}
                  setShowDetailsOwesId={setShowDetailsOwesId}
                  showDetailsOwesId={showDetailsOwesId}
                />
              ))}
        </ul>
      </div>
      <div className="w-full">
        <div className="w-full py-4 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
          You Owe
        </div>
        <ul className="divide-y-2 divide-accentBorder dark:divide-accentBorder-dark max-h-[70svh] overflow-auto p-4">
          {transactionLoading && <LoadingSpinner />}
          {!transactionLoading &&
            transactions
              .filter((transaction) => !transaction.owesMoney)
              .map((transaction, index) => (
                <TransactionItem
                  key={transaction.transactionId + `${index}`}
                  id={transaction.transactionId + `${index}`}
                  transaction={transaction}
                  setShowDetailsOwedId={setShowDetailsOwedId}
                  showDetailsOwedId={showDetailsOwedId}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
