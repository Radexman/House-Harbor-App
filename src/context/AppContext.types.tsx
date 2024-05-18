import { ReactNode } from 'react';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
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
  lastFetchedListing: QueryDocumentSnapshot<DocumentData> | null;
  lastFetchedOfferListing: QueryDocumentSnapshot<DocumentData> | null;
  onGoogleClick: () => void;
  fetchListings: (category: string | undefined) => Promise<void>;
  onFetchMoreListings: (category: string | undefined) => Promise<void>;
  onFetchMoreOffersListings: () => Promise<void>;
  fetchOffersListings: () => void;
  fetchSingleListing: (listingId: string | undefined) => void;
  handleLogout: () => void;
  handleChangeDetails: (username: string) => void;
  handleChangePhoneNumber: (phoneNumber: number) => void;
};
