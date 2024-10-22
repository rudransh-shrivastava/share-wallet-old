import React, { useState } from 'react';
import { axiosWithCredentials } from '../utils/axiosWithCredentials';
import LoadingSpinner from './LoadingSpinner';
import { useDashboardDataContext } from '../context/dashboardData';
import ProfilePic from './ProfilePic';

const TransactionItem = ({
  transaction,
  id,
  setShowDetailsOwesId,
  showDetailsOwesId,
  setShowDetailsOwedId,
  showDetailsOwedId,
}) => {
  const { getDashboardData } = useDashboardDataContext();
  const { transactionId, name, amount, owesMoney, createdBy } = transaction;
  let showDetails = false;
  if (transaction.owesMoney) {
    showDetails = showDetailsOwesId === id;
  } else {
    showDetails = showDetailsOwedId === id;
  }
  const [deleteTransactionLoading, setDeleteTransactionLoading] =
    useState(false);
  const handleClick = () => {
    if (transaction.owesMoney) {
      setShowDetailsOwesId((prevShowDetailsOwesId) =>
        prevShowDetailsOwesId === id ? null : id
      );
    } else {
      setShowDetailsOwedId((prevShowDetailsOwedId) =>
        prevShowDetailsOwedId === id ? null : id
      );
    }
  };
  return (
    <>
      <div>
        <li
          className={`${
            showDetails ? 'bg-accentBorder dark:bg-accentBorder-dark' : ''
          }`}
        >
          <div
            className="flex items-center gap-3 p-4 cursor-pointer"
            onClick={() => {
              handleClick();
            }}
          >
            <ProfilePic name={name} />
            <div className="flex flex-col">
              <div>{name}</div>
              <div className="text-sm opacity-70">
                {owesMoney
                  ? `${name} owes you \u20B9${amount}`
                  : `You owe ${name} \u20B9${amount}`}
              </div>
            </div>
            <button
              className="ml-auto size-8"
              disabled={deleteTransactionLoading}
              onClick={async (e) => {
                handleClick();
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
                  className="opacity-80"
                  fill="currentColor"
                >
                  <path d="M282.975-140.001q-25.705 0-44.134-18.43-18.429-18.429-18.429-44.134v-532.05h-40.411v-50.255h174.05v-30.513h251.898v30.513h174.05v50.255h-40.411v532.05q0 25.788-18.387 44.176-18.388 18.388-44.176 18.388h-394.05Zm406.358-594.614H270.667v532.05q0 5.385 3.59 8.847 3.59 3.462 8.718 3.462h394.05q4.616 0 8.462-3.847 3.846-3.846 3.846-8.462v-532.05ZM379.54-273.231h50.255v-379.077H379.54v379.077Zm150.665 0h50.255v-379.077h-50.255v379.077ZM270.667-734.615V-190.256-734.615Z" />
                </svg>
              )}
            </button>
          </div>
          {
            <div
              className={`grid transition-all overflow-hidden pb-0 ${
                showDetails ? 'pb-4' : ''
              }`}
              style={{
                gridTemplateRows: `repeat(1, ${showDetails ? '1fr' : '0fr'})`,
              }}
            >
              <div className="px-4 overflow-hidden">
                <div className="p-2">{transaction.description}</div>
                <div className="p-2 pt-0">
                  Added on {new Date(transaction.time).toLocaleString()} by{' '}
                  {createdBy}
                </div>
              </div>
            </div>
          }
        </li>
      </div>
    </>
  );
};

export default TransactionItem;
