import React from 'react';
import axios from 'axios';

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
      {/* <a href="/login/google"> */}
      {/* NOTE: Change the onClick Function  */}
      <button
        className="bg-white hover:bg-emerald-700 text-accentDark px-4 py-2 rounded-md"
        onClick={openLoginPopup}
      >
        Login
      </button>
      {/* </a> */}
      {/* TODO: Change to Logout If already Logged In */}
    </nav>
  );
};
// TODO: Gopal: Create a popup for login, the popup should include only one input field, the email id, and a Login button, it should also include a Sign Up button next to the Login button and that should open a new popup with the signup form, then signup form is submitted with the /CreateUser API
function openLoginPopup() {
  console.log('Login Popup Opened');
}
export default Nav;
