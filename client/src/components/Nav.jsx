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
        <div className="mr-2 text-3xl text- text-white font-bold">
          Share Wallet
        </div>
      </div>
      <div>
        <a href="http://localhost:3001/auth/google">
          <button className="bg-white hover:bg-emerald-700 text-accentDark px-4 py-2 rounded-md">
            Login
          </button>
        </a>{' '}
        <a href="http://localhost:3001/auth/google/logout">
          <button className="bg-white hover:bg-emerald-700 text-accentDark px-4 py-2 rounded-md">
            Logout
          </button>
        </a>
      </div>
    </nav>
  );
};
export default Nav;
