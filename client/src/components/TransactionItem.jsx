import React, { useState } from 'react';
import { axiosWithCredentials } from '../axiosWithCredentials';
import LoadingSpinner from './LoadingSpinner';
import { useDashboardDataContext } from '../context/dashboardData';

const TransactionItem = ({ transaction }) => {
  const { getDashboardData } = useDashboardDataContext();
  const { transactionId, name, amount, owesMoney } = transaction;
  const [deleteTransactionLoading, setDeleteTransactionLoading] =
    useState(false);
  return (
    <>
      <div>
        <li>
          <div className="flex items-center gap-3 p-3 cursor-pointer">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder dark:bg-accentBorder-dark">
              {name[0]}
            </div>
            <div className="flex flex-col">
              <div>{name}</div>
              <div className="text-sm opacity-70">
                {owesMoney
                  ? `${name} owes you \u20B9${amount}`
                  : `You owe ${name} \u20B9${amount}`}
              </div>
            </div>
            <button
              className="ml-auto"
              disabled={deleteTransactionLoading}
              onClick={async () => {
                await axiosWithCredentials({
                  path: `/transaction/delete?transactionId=${transactionId}`,
                  method: 'get',
                  setDataLoading: setDeleteTransactionLoading,
                });
                getDashboardData();
              }}
            >
              {deleteTransactionLoading && <LoadingSpinner />}
              {!deleteTransactionLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  viewBox="0 -960 960 960"
                  width="32"
                  className="fill-textPrimary dark:fill-textPrimary-dark opacity-80"
                >
                  <path d="M282.975-140.001q-25.705 0-44.134-18.43-18.429-18.429-18.429-44.134v-532.05h-40.411v-50.255h174.05v-30.513h251.898v30.513h174.05v50.255h-40.411v532.05q0 25.788-18.387 44.176-18.388 18.388-44.176 18.388h-394.05Zm406.358-594.614H270.667v532.05q0 5.385 3.59 8.847 3.59 3.462 8.718 3.462h394.05q4.616 0 8.462-3.847 3.846-3.846 3.846-8.462v-532.05ZM379.54-273.231h50.255v-379.077H379.54v379.077Zm150.665 0h50.255v-379.077h-50.255v379.077ZM270.667-734.615V-190.256-734.615Z" />
                </svg>
              )}
            </button>
          </div>
        </li>
      </div>
    </>
  );
};

export default TransactionItem;
