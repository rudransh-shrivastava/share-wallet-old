import React from 'react';

const Item = () => {
  return (
    <>
      <div>
        <li>
          <div className="flex items-center gap-3 p-3 cursor-pointer">
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
              P
            </div>
            <div className="flex flex-col">
              <div>Person 1</div>
              <div className="text-sm opacity-70">
                You owe Person 1 &#8377;56
              </div>
            </div>
          </div>
        </li>
      </div>
    </>
  );
};

export default Item;
