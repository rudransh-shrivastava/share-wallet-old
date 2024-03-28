import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import Overall from './Overall';
import Transactions from './Transactions';
import { useUserContext } from '../context/user';
import LoadingSpinner from './LoadingSpinner';
import { usePopupContext } from '../context/popup';
import { useDashboardDataContext } from '../context/dashboardData';

function Dashboard() {
  const {
    user,
    setUser,
    userLoading,
    setUserLoading,
    userError,
    setUserError,
  } = useUserContext();
  const { showPopup } = usePopupContext();

  const {
    getDashboardData,
    transactions,
    transactionLoading,
    userTotal,
    userTotalLoading,
  } = useDashboardDataContext();

  return (
    <div className="container mx-auto my-8 px-2 lg:px-8">
      {userLoading && <LoadingSpinner />}
      {!userLoading && userError && (
        <div className="text-center text-xl p-10">Please Login</div>
      )}
      {!userLoading && user && (
        <div className="border-2 border-accentBorder dark:border-accentBorder-dark divide-y-2 divide-accentBorder dark:divide-accentBorder-dark rounded-md">
          <Heading />
          <Overall userTotal={userTotal} userTotalLoading={userTotalLoading} />
          <Transactions
            transactions={transactions}
            transactionLoading={transactionLoading}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
