import React from 'react';
import Heading from './Heading';
import Overall from './Overall';

function Dashboard() {
  return (
    <div className="container mx-auto my-8 border-2 border-accentBorder divide-y-2 divide-accentBorder rounded-md">
      <Heading />
      <Overall />
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
