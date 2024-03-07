import { createContext, useContext } from 'react';

export const DashboardDataContext = createContext({
  getDashboardData: () => {},
});

export const DashboardDataProvider = DashboardDataContext.Provider;

export function useDashboardDataContext() {
  return useContext(DashboardDataContext);
}
