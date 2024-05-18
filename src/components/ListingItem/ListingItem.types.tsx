import FetchedDataTypes from '../../pages/Category/Category.types';

export type ListingItemProps = {
  listing: FetchedDataTypes;
  id?: string;
  onDelete?: (id: string | undefined) => void;
  onEdit?: (id: string | undefined) => void;
};
