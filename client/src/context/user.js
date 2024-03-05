import { createContext, useContext } from 'react';

export const UserContext = createContext({
  user: {},
  setUser: () => {},
  userLoading: null,
  setUserLoading: () => {},
  userError: null,
  setUserError: () => {},
});

export const UserProvider = UserContext.Provider;

export function useUserContext() {
  return useContext(UserContext);
}
