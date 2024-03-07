import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import Overall from './Overall';
import Transactions from './Transactions';
import { useUserContext } from '../context/user';
import LoadingSpinner from './LoadingSpinner';
import { usePopupContext } from '../context/popup';
import { axiosWithCredentials } from '../axiosWithCredentials';
import { DashboardDataProvider } from '../context/dashboardData';

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

  const [transactions, setTransactions] = useState([]);
  const [transactionLoading, setTransactionLoading] = useState([]);
  const [transactionError, setTransactionError] = useState([]);

  const [userTotal, setUserTotal] = useState({});
  const [userTotalLoading, setUserTotalLoading] = useState(false);
  const [userTotalError, setUserTotalError] = useState(null);

  function getDashboardData() {
    axiosWithCredentials({
      path: '/user/total',
      setData: setUserTotal,
      setDataLoading: setUserTotalLoading,
      setDataError: setUserTotalError,
    });
    axiosWithCredentials({
      path: '/transaction/list',
      setData: setTransactions,
      setDataLoading: setTransactionLoading,
      setDataError: setTransactionError,
    });
  }

  useEffect(() => {
    if (!showPopup) {
      getDashboardData();
    }
  }, [showPopup]);

  return (
    <DashboardDataProvider value={{ getDashboardData }}>
      <div className="container mx-auto my-8 px-2">
        {userLoading && <LoadingSpinner />}
        {!userLoading && userError && (
          <div className="text-center text-xl p-10">Please Login</div>
        )}
        {!userLoading && user && (
          <div className="border-2 border-accentBorder dark:border-accentBorder-dark divide-y-2 divide-accentBorder dark:divide-accentBorder-dark rounded-md">
            <Heading />
            <Overall
              userTotal={userTotal}
              userTotalLoading={userTotalLoading}
              userTotalError={userTotalError}
            />
            <Transactions
              transactions={transactions}
              transactionLoading={transactionLoading}
            />
          </div>
        )}
      </div>
    </DashboardDataProvider>
  );
}

export default Dashboard;
