import React from 'react';

const Overall = () => {
  return (
    <div className="flex w-full justify-center gap-8">
      <div className="flex flex-col items-center p-4">
        <span>Total Balance</span>
        <span className="text-2xl">+ &#8377;18</span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span>You Owe</span>
        <span className="text-2xl">&#8377;45</span>
      </div>
      <div className="flex flex-col items-center p-4">
        <span>You are Owed</span>
        <span className="text-2xl">&#8377;86</span>
      </div>
    </div>
  );
};

export default Overall;
