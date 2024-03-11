import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/user';
import useLocalStorage from '../context/useLocalStorage';
import ProfilePic from './ProfilePic';
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

  const [darkTheme, setDarkTheme] = useLocalStorage(
    'STORED_DARK_THEME',
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    getUserDetails(setUser, setUserLoading, setUserError);
  }, []);

  return (
    <nav className="border-b-2 border-accentBorder dark:border-accentBorder-dark">
      <div className="relative container mx-auto flex py-4 justify-between px-2 lg:px-10">
        <div className="flex items-center">
          <div className="mr-2">
            <svg
              className="size-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 745.56"
            >
              <path
                fill="hsl(170, 60%, 70%)"
                d="M775.46,272.78H152.17a52.63,52.63,0,0,0-8.19.64L682.93,129a52.17,52.17,0,0,1,63.89,36.89Z"
                transform="translate(-100 -127.22)"
              />
              <path
                fill="hsl(170, 60%, 45%)"
                d="M144,273.42l-10.5,2.81A51.25,51.25,0,0,1,144,273.42Z"
                transform="translate(-100 -127.22)"
              />
              <path
                fill="hsl(170, 60%, 45%)"
                d="M598.89,491.67A114.7,114.7,0,0,0,680,687.48H900V820.61a52.17,52.17,0,0,1-52.17,52.17H152.17A52.17,52.17,0,0,1,100,820.61V324.94a52.17,52.17,0,0,1,33.48-48.71l10.5-2.81a52.63,52.63,0,0,1,8.19-.64H847.83A52.16,52.16,0,0,1,900,324.94V458.07H680A114.35,114.35,0,0,0,598.89,491.67Z"
                transform="translate(-100 -127.22)"
              />
              <path
                fill="none"
                d="M680,458.07a114.71,114.71,0,1,0,0,229.41H900V458.07ZM739.72,629.8a80.63,80.63,0,1,1,23.62-57A80.39,80.39,0,0,1,739.72,629.8Z"
                transform="translate(-100 -127.22)"
              />
              <path
                fill="hsl(170, 60%, 45%)"
                d="M763.34,572.78a80.64,80.64,0,1,1-23.62-57A80.39,80.39,0,0,1,763.34,572.78Z"
                transform="translate(-100 -127.22)"
              />
            </svg>
          </div>
          <div className="mr-2 text-2xl text-textPrimary dark:text-textPrimary-dark font-bold">
            Share Wallet
          </div>
        </div>
        <div className="ml-auto flex gap-4 items-center">
          <button
            onClick={() => {
              setDarkTheme((prevDarkTheme) => !prevDarkTheme);
            }}
          >
            {darkTheme ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                viewBox="0 -960 960 960"
                width="40"
                fill="currentColor"
              >
                <path d="M480-346.666q55.333 0 94.334-39 39-39.001 39-94.334 0-55.333-39-94.334-39.001-39-94.334-39-55.333 0-94.334 39-39 39.001-39 94.334 0 55.333 39 94.334 39.001 39 94.334 39ZM480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-446.667H40v-66.666h160v66.666Zm720 0H760v-66.666h160v66.666ZM446.667-760v-160h66.666v160h-66.666Zm0 720v-160h66.666v160h-66.666ZM260-655.333l-100.333-97 47.666-49 96 100-43.333 46Zm493.333 496-97.666-100.334 45-45.666 99.666 97.666-47 48.334Zm-98.666-541.334 97.666-99.666 49 47L702-656l-47.333-44.667ZM159.333-207.333 259-305l46.333 45.667-97.666 99.666-48.334-47.666ZM480-480Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                viewBox="0 -960 960 960"
                width="40"
                fill="currentColor"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q10 0 20.5.667 10.5.666 24.166 2-37.666 31-59.166 77.833T444-660q0 90 63 153t153 63q53 0 99.667-20.5 46.666-20.5 77.666-56.166 1.334 12.333 2 21.833.667 9.5.667 18.833 0 150-105 255T480-120Zm0-66.666q102 0 179.334-61.167t101.333-147.834q-23.333 9-49.111 13.667-25.778 4.666-51.556 4.666-117.459 0-200.063-82.603Q377.334-542.541 377.334-660q0-22.667 4.333-47.667t14.667-55q-91.334 28.666-150.501 107Q186.666-577.334 186.666-480q0 122 85.667 207.667T480-186.666Zm-6-288.001Z" />
              </svg>
            )}
          </button>
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
                className={`rounded-full ${
                  showUserDetailsPane
                    ? 'ring-2 ring-textPrimary dark:ring-textPrimary-dark'
                    : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserDetailsPane((prev) => !prev);
                }}
              >
                <ProfilePic name={user.name} />
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
                  <button className="bg-accentDark dark:bg-accentDark-darkhover:bg-emerald-700  dark:hover:bg-emerald-500 text-bgPrimary dark:text-bgPrimary-dark px-4 py-2 rounded-md">
                    Logout
                  </button>
                </a>
              </div>
            )}
          </div>
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
