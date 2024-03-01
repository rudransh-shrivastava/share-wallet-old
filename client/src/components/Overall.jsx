import React, { useEffect, useState } from 'react';
import data from '../assets/data.json';
import axios from 'axios';

const Overall = () => {
  function getUserTotal(user) {
    axios
      .get('http://localhost:3001/user/total', {
        withCredentials: true,
      })
      .then((res) => {
        setOverall({ ...res.data, loaded: true });
      });
  }

  const [overall, setOverall] = useState({ loaded: false });
  const { totalBalance, youOwe, youAreOwed } = data.overall;
  // TODO: make it reload when we change other data
  useEffect(() => {
    getUserTotal('Gopal');
  }, []);

  return (
    <div className="flex w-full justify-center gap-8">
      <div className="flex flex-col items-center p-4">
        <span>Total Balance</span>
        <span className="text-2xl">
          {overall.loaded ? `${Number(overall.total) < 0 ? '-' : ''}` : ''}
          &#8377;
          {`${overall.loaded ? Math.abs(Number(overall.total)) : 'Loading'}`}
        </span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span>You Owe</span>
        <span className="text-2xl">
          &#8377;{overall.loaded ? overall.owes : 'Loading'}
        </span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span>You are Owed</span>
        <span className="text-2xl">
          &#8377;{overall.loaded ? overall.owed : 'Loading'}
        </span>
      </div>
    </div>
  );
};

export default Overall;
