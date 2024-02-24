import React from 'react';
import Heading from './Heading';
import Overall from './Overall';
import Transactions from './Transactions';

function Dashboard() {
  return (
    <div className="container mx-auto my-8 border-2 border-accentBorder divide-y-2 divide-accentBorder rounded-md">
      <Heading />
      <Overall />
      <Transactions />
    </div>
  );
}

export default Dashboard;
