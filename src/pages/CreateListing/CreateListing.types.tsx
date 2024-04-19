export type CreateListingTypes = {
  type: 'rent' | 'sale';
  address: string;
  userRef: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  location: string;
  offer: boolean;
  regularPrice: number;
  discountedPrice: number;
  imagesUrls: FileList;
  latitude: number;
  longitude: number;
};
