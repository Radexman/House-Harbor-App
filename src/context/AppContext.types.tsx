import { ReactNode } from 'react';
import FetchedDataTypes from '../pages/Category/Category.types';
import { ListingType } from '../types/app.types';

export type AppContextPropTypes = {
  children: ReactNode;
};

export type ContextProps = {
  listings: FetchedDataTypes[];
  isLoading: boolean;
  offerListings: FetchedDataTypes[];
  singleListing: ListingType | undefined;
  onGoogleClick: () => void;
  fetchListings: (category: string | undefined) => Promise<void>;
  fetchOffersListings: () => void;
  fetchSingleListing: (listingId: string | undefined) => void;
  handleLogout: () => void;
  handleChangeDetails: (username: string) => void;
  handleChangePhoneNumber: (phoneNumber: number) => void;
};
