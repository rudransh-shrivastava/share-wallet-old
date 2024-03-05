import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/user';
const REACT_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const Nav = () => {
  const {
    user,
    setUser,
    userLoading,
    setUserLoading,
    userError,
    setUserError,
  } = useUserContext();
  const [showUserDetailsPane, setShowUserDetailsPane] = useState(false);

  useEffect(() => {
    getUserDetails(setUser, setUserLoading, setUserError);
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <nav className="border-b-2 border-accentBorder dark:border-accentBorder-dark">
      <div className="relative container mx-auto flex py-4 justify-between px-2">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              className="size-12"
              src="src/sharewallet.jpg"
              alt="Share Wallet"
            />
          </div>
          <div className="mr-2 text-3xl text- text-bgPrimary font-bold">
            Share Wallet
          </div>
        </div>
        <div className="flex flex-column">
          {!user && !userLoading && (
            <a href={`${REACT_APP_SERVER_URL}/auth/google`}>
              <button className="bg-accentDark dark:bg-accentDark-darkhover:bg-emerald-700  dark:hover:bg-emerald-500 px-4 py-2 rounded-md m-1">
                Login
              </button>
            </a>
          )}
          {user && (
            <button
              className={`w-11 h-11 flex items-center justify-center rounded-full bg-accentDark dark:bg-accentDark ${
                showUserDetailsPane
                  ? 'ring-2 ring-textPrimary dark:ring-textPrimary-dark'
                  : ''
              }`}
              onClick={() => setShowUserDetailsPane((prev) => !prev)}
            >
              {user.name[0]}
            </button>
          )}
          {user && showUserDetailsPane && (
            <div className="absolute top-full right-0 rounded-md translate-y-2 bg-red-500 bg-bgPrimary dark:bg-bgPrimary-dark border-2 border-accentBorder dark:border-accentBorder-dark p-2 flex flex-col gap-2 items-center">
              <span>Hey There, You are Logged in as</span>
              <span>{user?.name}</span>
              <a href={`${REACT_APP_SERVER_URL}/auth/google/logout`}>
                <button className="bg-accentDark dark:bg-accentDark-darkhover:bg-emerald-700  dark:hover:bg-emerald-500 px-4 py-2 rounded-md">
                  Logout
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Nav;

async function getUserDetails(setUser, setUserLoading, setUserError) {
  let res = null;
  setUserError((prevError) => false);
  try {
    setUserLoading(true);
    res = await axios.get(`${REACT_APP_SERVER_URL}/user/details`, {
      withCredentials: true,
    });
    if (res?.data) {
      setUser(res.data[0]);
    } else {
      setUser(null);
    }
    setUserLoading(false);
  } catch (err) {
    console.log("Couldn't Authenticate", err);
    setUser(null);
    setUserLoading(false);
    setUserError(true);
  }
}
