import React from 'react';

const Nav = () => {
  return (
    <nav className="flex justify-between items-center bg-accentDark p-2">
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
        <div className="mr-2 mt-1 text-2xl text-bgPrimary">
          Hey! CurrentlyLoggedInUser
          {/* TODO: Gopal: Change to currently logged in user's name => fetch from /user/details */}
        </div>
        <a href="http://localhost:3001/auth/google">
          <button className="bg-bgPrimary dark:bg-bgPrimary-dark hover:bg-emerald-100  dark:hover:bg-emerald-950  px-4 py-2 rounded-md m-1">
            Login
          </button>
        </a>{' '}
        <a href="http://localhost:3001/auth/google/logout">
          <button className="bg-bgPrimary dark:bg-bgPrimary-dark hover:bg-emerald-100 dark:hover:bg-emerald-950  px-4 py-2 rounded-md m-1">
            Logout
          </button>
        </a>
      </div>
    </nav>
  );
};
export default Nav;
