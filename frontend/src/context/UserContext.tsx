'use client';
import { createContext } from 'react';
import useGetMe from '~/hooks/user/useGetMe';

export type TUserContext = {
  isLogin: boolean;
};

const defaultContextValue: TUserContext = {
  isLogin: false,
};

export const userContext = createContext<TUserContext>(defaultContextValue);

const UserContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const { data, error } = useGetMe({
    retry: 1,
  });

  return (
    <userContext.Provider
      value={{
        isLogin: !!data && !error,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
