import React from 'react';

const Item = ({ transaction }) => {
  const { transactionId, name, amount, owesMoney } = transaction;
  return (
    <>
      <div>
        <li>
          <div className="flex items-center gap-3 p-3 cursor-pointer">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder dark:bg-accentBorder-dark">
              {name[0]}
            </div>
            <div className="flex flex-col">
              <div>{transactionId}</div>
              <div className="text-sm opacity-70">
                {owesMoney
                  ? `You owe ${name} \u20B9${amount}`
                  : `${name} owes you \u20B9${amount}`}
              </div>
            </div>
          </div>
        </li>
      </div>
    </>
  );
};

export default Item;
