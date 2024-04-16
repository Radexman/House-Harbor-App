import { ReactNode } from 'react';

export type AppContextPropTypes = {
  children: ReactNode;
};

export type ContextProps = {
  isLoading: boolean;
  onGoogleClick: () => void;
};
