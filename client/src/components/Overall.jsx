import React, { useEffect, useState } from 'react';
import { usePopupContext } from '../context/popup';
import { axiosWithCredentials } from '../axiosWithCredentials';
import LoadingSpinner from './LoadingSpinner';

const Overall = () => {
  const { showPopup } = usePopupContext();
  const [userTotal, setUserTotal] = useState({});
  const [userTotalLoading, setUserTotalLoading] = useState(false);
  const [userTotalError, setUserTotalError] = useState(null);

  useEffect(() => {
    if (!showPopup) {
      getUserTotal({ setUserTotal, setUserTotalLoading, setUserTotalError });
    }
  }, [showPopup]);

  return (
    <div className="flex flex-wrap w-full justify-center sm:gap-4 md:gap-8 py-2">
      {userTotalError ? 'Something went wrong' : ''}
      {userTotalLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex flex-col items-center p-2">
            <span className="text-center">Total Balance</span>
            <span
              className={`text-2xl ${
                Number(userTotal.total) < 0
                  ? 'text-red-700 dark:text-red-500'
                  : 'text-green-700 dark:text-green-400'
              }`}
            >
              {Number(userTotal.total) < 0 ? '-' : '+'}
              &#8377;
              {Math.abs(Number(userTotal.total?.toFixed(2)))}
            </span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span>You Owe</span>
            <span className="text-2xl">
              &#8377;{userTotal.owes?.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col items-center p-2">
            <span>You are Owed</span>
            <span className="text-2xl">
              &#8377;{userTotal.owed?.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

function getUserTotal({
  setUserTotal,
  setUserTotalLoading,
  setUserTotalError,
}) {
  axiosWithCredentials({
    path: '/user/total',
    setData: setUserTotal,
    setDataLoading: setUserTotalLoading,
    setDataError: setUserTotalError,
  });
}

export default Overall;
