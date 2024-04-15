import { ReactNode } from 'react';

export type AppContextPropTypes = {
  children: ReactNode;
};

export type ContextProps = {
  onGoogleClick: () => void;
};
