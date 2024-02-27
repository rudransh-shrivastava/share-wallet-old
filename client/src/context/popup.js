import { createContext, useContext } from 'react';

export const PopupContext = createContext({
  showAddExpensePopup: null,
  setShowAddExpensePopup: () => {},
});

export const PopupProvider = PopupContext.Provider;
export default function usePopup() {
  return useContext(PopupContext);
}
