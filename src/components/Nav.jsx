import React from 'react';

const Nav = () => {
  return (
    <nav className="flex justify-between items-center bg-dark p-4">
      <div className="flex items-center">
        <div className="mr-4">
          <img
            className="size-12"
            src="public/sharewallet.jpg"
            alt="Share Wallet"
          />
        </div>
        <div className="mr-2 text-3xl text- text-white font-bold">
          Share Wallet
        </div>
      </div>
      <button className="ml-2 text-3xl text-white">Logout</button>
    </nav>
  );
};

export default Nav;
