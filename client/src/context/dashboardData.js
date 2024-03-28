import { createContext, useContext } from 'react';

export const DashboardDataContext = createContext({
  transactions: null,
  transactionLoading: null,
  userTotal: null,
  userTotalLoading: null,
  getDashboardData: () => {},
});

export const DashboardDataProvider = DashboardDataContext.Provider;

export function useDashboardDataContext() {
  return useContext(DashboardDataContext);
}
