import { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Nav from './components/Nav';
import { PopupProvider } from './context/popup';
import { UserProvider } from './context/user';
import Popup from './components/Popup';
import Footer from './components/Footer';
import { axiosWithCredentials } from './utils/axiosWithCredentials';
import { DashboardDataProvider } from './context/dashboardData';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [PopupContent, setPopupContent] = useState(null);
  const [popupTitle, setPopupTitle] = useState('');

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(false);
  const [showNavPane, setShowNavPane] = useState(false);

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
    getDashboardData();
  }, []);

  return (
    <DashboardDataProvider
      value={{
        transactions,
        transactionLoading,
        userTotal,
        userTotalLoading,
        getDashboardData,
      }}
    >
      <UserProvider
        value={{
          user,
          setUser,
          userLoading,
          setUserLoading,
          userError,
          setUserError,
        }}
      >
        <PopupProvider
          value={{
            showPopup,
            setShowPopup,
            PopupContent,
            setPopupContent,
            popupTitle,
            setPopupTitle,
          }}
        >
          <div
            onClick={({ target }) => {
              setShowNavPane((prev) =>
                target.closest('.nav-pane') === null ? null : prev
              );
            }}
            className="min-h-svh"
          >
            <Nav showNavPane={showNavPane} setShowNavPane={setShowNavPane} />
            <Dashboard />
            <Footer />
            {showPopup && <Popup />}
          </div>
        </PopupProvider>
      </UserProvider>
    </DashboardDataProvider>
  );
}

export default App;
