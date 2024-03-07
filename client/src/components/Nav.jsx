import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/user';
import shareWalletLogo from '/shareWalletLogo.jpg';
const REACT_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const Nav = ({ showUserDetailsPane, setShowUserDetailsPane }) => {
  const {
    user,
    setUser,
    userLoading,
    setUserLoading,
    userError,
    setUserError,
  } = useUserContext();

  useEffect(() => {
    getUserDetails(setUser, setUserLoading, setUserError);
  }, []);
  return (
    <nav className="border-b-2 border-accentBorder dark:border-accentBorder-dark">
      <div className="relative container mx-auto flex py-4 justify-between px-2 lg:px-10">
        <div className="flex items-center">
          <div className="mr-4">
            <img className="size-12" src={shareWalletLogo} alt="Share Wallet" />
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
              onClick={(e) => {
                e.stopPropagation();
                setShowUserDetailsPane((prev) => !prev);
              }}
            >
              {user.name[0]}
            </button>
          )}
          {user && showUserDetailsPane && (
            <div
              className="absolute top-full right-10 rounded-md translate-y-2 bg-bgPrimary dark:bg-bgPrimary-dark border-2 border-accentBorder dark:border-accentBorder-dark p-2 flex flex-col gap-2 items-center"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
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
