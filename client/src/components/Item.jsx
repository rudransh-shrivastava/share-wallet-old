import React from 'react';

const Item = ({ transaction }) => {
  const { name, amount, ownsMoney } = transaction;
  return (
    <>
      <div>
        <li>
          <div className="flex items-center gap-3 p-3 cursor-pointer">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
              {name[0]}
            </div>
            <div className="flex flex-col">
              <div>{name}</div>
              <div className="text-sm opacity-70">
                {ownsMoney
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
