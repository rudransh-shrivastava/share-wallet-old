import { createContext, useContext } from 'react';

export const PopupContext = createContext({
  showPopup: null,
  setShowPopup: () => {},
  PopupContent: null,
  setPopupContent: () => {},
  popupTitle: '',
  setPopupTitle: () => {},
});

export const PopupProvider = PopupContext.Provider;

export function usePopupContext() {
  return useContext(PopupContext);
}
