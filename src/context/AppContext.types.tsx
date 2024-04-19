import { ReactNode } from 'react';
import FetchedDataTypes from '../pages/Category/Category.types';

export type AppContextPropTypes = {
  children: ReactNode;
};

export type ContextProps = {
  listings: FetchedDataTypes[];
  isLoading: boolean;
  offerListings: FetchedDataTypes[];
  onGoogleClick: () => void;
  fetchListings: (category: string | undefined) => Promise<void>;
  fetchOffersListings: () => void;
  handleLogout: () => void;
  handleChangeDetails: (username: string) => void;
};
