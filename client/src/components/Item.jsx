import React from 'react';
import { axiosWithCredentials } from '../axiosWithCredentials';
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
              <div>{name}</div>
              <div className="text-sm opacity-70">
                {owesMoney
                  ? `${name} owes you \u20B9${amount}`
                  : `You owe ${name} \u20B9${amount}`}
              </div>
            </div>
            <button
              className="ml-auto"
              onClick={() => {
                axiosWithCredentials({
                  path: `/transaction/delete?transactionId=${transactionId}`,
                  method: 'get',
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                viewBox="0 -960 960 960"
                width="40"
                className="fill-textPrimary dark:fill-textPrimary-dark opacity-70"
              >
                <path d="M267.333-120q-27.5 0-47.083-19.583t-19.583-47.083v-553.335H160v-66.666h192V-840h256v33.333h192v66.666h-40.667v553.335q0 27-19.833 46.833T692.667-120H267.333Zm425.334-620.001H267.333v553.335h425.334v-553.335Zm-328 469.335h66.666v-386.001h-66.666v386.001Zm164 0h66.666v-386.001h-66.666v386.001ZM267.333-740.001v553.335-553.335Z" />
              </svg>
            </button>
          </div>
        </li>
      </div>
    </>
  );
};

export default Item;
