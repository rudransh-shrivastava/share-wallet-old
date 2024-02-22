import React from 'react';

function Dashboard() {
  return (
    <div className="container mx-auto my-8 border-2 border-accentBorder divide-y-2 divide-accentBorder rounded-md">
      <div className="flex items-center  p-4">
        <span className="text-xl">Dashboard</span>
        <div className="flex gap-2 ml-auto">
          <button className="bg-accentDark text-white px-4 py-2 rounded-md">
            Add Expense
          </button>
          <button className="bg-accentDark text-white px-4 py-2 rounded-md">
            Add Friend
          </button>
        </div>
      </div>
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
      <div className="flex divide-x-2 divide-accentBorder">
        <div className="w-full">
          <div className="w-full py-2 border-b-2 border-accentBorder text-center">
            You Owe
          </div>
          <ul className="divide-y-2 divide-accentBorder">
            {/* TODO: make each li it's own component */}
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
            </li>{' '}
            <li>
              <div className="flex items-center gap-3 p-3 cursor-pointer">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
                  P
                </div>
                <div className="flex flex-col">
                  <div>Person 6</div>
                  <div className="text-sm opacity-70">
                    You owe Person 1 &#8377;6
                  </div>
                </div>
              </div>
            </li>{' '}
            <li>
              <div className="flex items-center gap-3 p-3 cursor-pointer">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
                  P
                </div>
                <div className="flex flex-col">
                  <div>Person 9</div>
                  <div className="text-sm opacity-70">
                    You owe Person 1 &#8377;5
                  </div>
                </div>
              </div>
            </li>{' '}
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
          </ul>
        </div>
        <div className="w-full">
          <div className="w-full py-2 border-b-2 border-accentBorder text-center">
            You are Owed
          </div>
          <ul className="divide-y-2 divide-accentBorder">
            {/* TODO: make each li it's own component */}
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
            </li>{' '}
            <li>
              <div className="flex items-center gap-3 p-3 cursor-pointer">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
                  P
                </div>
                <div className="flex flex-col">
                  <div>Person 6</div>
                  <div className="text-sm opacity-70">
                    You owe Person 1 &#8377;6
                  </div>
                </div>
              </div>
            </li>{' '}
            <li>
              <div className="flex items-center gap-3 p-3 cursor-pointer">
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-accentBorder">
                  P
                </div>
                <div className="flex flex-col">
                  <div>Person 9</div>
                  <div className="text-sm opacity-70">
                    You owe Person 1 &#8377;5
                  </div>
                </div>
              </div>
            </li>{' '}
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
