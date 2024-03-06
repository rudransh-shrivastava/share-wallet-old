import React, { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import LoadingSpinner from './LoadingSpinner';
import { axiosWithCredentials } from '../axiosWithCredentials';
import { usePopupContext } from '../context/popup';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionLoading, setTransactionLoading] = useState([]);
  const [transactionError, setTransactionError] = useState([]);
  const { showPopup } = usePopupContext();

  useEffect(() => {
    if (!showPopup) {
      getTransactions(
        setTransactions,
        setTransactionLoading,
        setTransactionError
      );
    }
  }, [showPopup]);

  return (
    <div className="flex flex-col lg:flex-row lg:divide-x-2 lg:divide-y-0 divide-accentBorder dark:divide-accentBorder-dark divide-y-2">
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
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
                  transaction={transaction}
                />
              ))}
        </ul>
      </div>
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
          You Owe
        </div>
        <ul className="divide-y-2 divide-accentBorder dark:divide-accentBorder-dark max-h-[70svh] overflow-auto p-4">
          {transactionLoading && <LoadingSpinner />}
          {!transactionLoading &&
            transactions
              .filter((transaction) => !transaction.owesMoney)
              .map((transaction) => (
                <TransactionItem
                  key={transaction.transactionId}
                  transaction={transaction}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

async function getTransactions(
  setTransactions,
  setTransactionLoading,
  setTransactionError
) {
  axiosWithCredentials({
    path: '/transaction/list',
    setData: setTransactions,
    setDataLoading: setTransactionLoading,
    setDataError: setTransactionError,
  });
}

export default Transactions;
