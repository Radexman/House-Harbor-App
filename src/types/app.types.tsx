import { GeoPoint, Timestamp } from 'firebase/firestore';

export type ListingType = {
  userRef: string;
  timestamp: Timestamp;
  name: string;
  imageUrls: string[];
  discountedPrice: number;
  geolocation: GeoPoint;
  type: 'rent' | 'sale';
  bathrooms: number;
  bedrooms: number;
  offer: boolean;
  parking: boolean;
  regularPrice: number;
  location: string;
  furnished: true;
};
