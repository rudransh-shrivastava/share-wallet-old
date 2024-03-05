import React, { useEffect, useState } from 'react';
import data from '../assets/data.json';
import axios from 'axios';
const REACT_APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
console.log(REACT_APP_SERVER_URL);
const Overall = () => {
  function getUserTotal() {
    try {
      axios
        .get(`${REACT_APP_SERVER_URL}/user/total`, {
          withCredentials: true,
        })
        .then((res) => {
          setOverall({ ...res.data, loaded: true });
        });
    } catch (err) {
      console.log(err);
    }
  }

  const [overall, setOverall] = useState({ loaded: false });
  // TODO: make it reload when we change other data && remove Gopal from the parameter
  useEffect(() => {
    getUserTotal();
  }, []);

  return (
    <div className="flex w-full justify-center sm:gap-4 md:gap-8 py-2">
      <div className="flex flex-col items-center p-2">
        <span className="text-center">Total Balance</span>
        <span className="text-2xl">
          {overall.loaded ? `${Number(overall.total) < 0 ? '-' : ''}` : ''}
          &#8377;
          {`${overall.loaded ? Math.abs(Number(overall.total)) : 'Loading'}`}
        </span>
      </div>
      <div className="flex flex-col items-center p-2">
        <span>You Owe</span>
        <span className="text-2xl">
          &#8377;{overall.loaded ? overall.owes : 'Loading'}
        </span>
      </div>
      <div className="flex flex-col items-center p-2">
        <span>You are Owed</span>
        <span className="text-2xl">
          &#8377;{overall.loaded ? overall.owed : 'Loading'}
        </span>
      </div>
    </div>
  );
};

export default Overall;
