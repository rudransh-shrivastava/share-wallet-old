import React from 'react';
import Heading from './Heading';
import Overall from './Overall';
import Transactions from './Transactions';

function Dashboard() {
  return (
    <div className="container mx-auto my-8 px-2">
      <div className="border-2 border-accentBorder dark:border-accentBorder-dark divide-y-2 divide-accentBorder dark:divide-accentBorder-dark rounded-md">
        <Heading />
        <Overall />
        <Transactions />
      </div>
    </div>
  );
}

export default Dashboard;
