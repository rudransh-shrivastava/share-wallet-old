import React, { useEffect, useState } from 'react';
import Item from './Item';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
const REACT_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionLoading, setTransactionLoading] = useState([]);
  const [transactionError, setTransactionError] = useState([]);

  useEffect(() => {
    getTransactions(
      setTransactions,
      setTransactionLoading,
      setTransactionError
    );
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:divide-x-2 lg:divide-y-0 divide-accentBorder dark:divide-accentBorder-dark divide-y-2">
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
          You Owe
        </div>
        <ul className="divide-y-2 divide-accentBorder dark:divide-accentBorder-dark max-h-[70svh] overflow-auto m-4">
          {transactionLoading && <LoadingSpinner />}
          {transactions
            .filter((transaction) => transaction.owesMoney)
            .map((transaction) => (
              <Item key={transaction.transactionId} transaction={transaction} />
            ))}
        </ul>
      </div>
      <div className="w-full">
        <div className="w-full py-2 border-b-2 border-accentBorder dark:border-accentBorder-dark text-center">
          You are Owed
        </div>
        <ul className="divide-y-2 divide-accentBorder dark:divide-accentBorder-dark max-h-[70svh] overflow-auto p-4">
          {transactionLoading && <LoadingSpinner />}
          {transactions
            .filter((transaction) => !transaction.owesMoney)
            .map((transaction) => (
              <Item key={transaction.transactionId} transaction={transaction} />
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
  let res = null;
  setTransactionError((prevError) => false);
  try {
    setTransactionLoading(true);
    res = await axios.get(`${REACT_APP_SERVER_URL}/transaction/list`, {
      withCredentials: true,
    });
    console.log(res.data);
    if (res?.data) {
      setTransactions(res.data);
    } else {
      setTransactions(null);
    }
    setTransactionLoading(false);
  } catch (err) {
    console.log("Couldn't Authenticate", err);
    setTransactions(null);
    setTransactionError(true);
  }
}

export default Transactions;
