// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Link } from 'react-router-dom';
import { FaBath as BathroomIcon } from 'react-icons/fa';
import { IoIosBed as BedroomIcon } from 'react-icons/io';
import {
  MdDeleteForever as DeleteIcon,
  MdEdit as EditIcon,
} from 'react-icons/md';
import { ListingItemProps } from './ListingItem.types';

function ListingItem({ listing, id, onDelete, onEdit }: ListingItemProps) {
  const {
    type,
    imageUrls,
    name,
    location,
    offer,
    discountedPrice,
    regularPrice,
    bedrooms,
    bathrooms,
  } = listing.data;

  return (
    <li>
      <Link
        to={`/category/${type}/${listing.id}`}
        className="flex flex-col gap-3 rounded-lg bg-base-200 p-3 shadow-sm shadow-primary transition-all duration-200 hover:shadow-md hover:shadow-primary sm:flex-row"
      >
        <div>
          <img
            src={imageUrls[0]}
            alt={`${name} house`}
            className="h-auto w-full rounded-md sm:h-32 sm:w-60"
          />
        </div>
        <div>
          <p className="text-sm">{location}</p>
          <h2 className="text-xl font-bold md:text-2xl">{name}</h2>
          <div className="flex items-center">
            <p className="pt-1 text-sm font-semibold text-primary">
              $
              {offer
                ? discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {type === 'rent' && ' / Month'}
            </p>
            {onDelete && (
              <DeleteIcon
                className="ml-2 mt-1 text-xl text-red-500"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(id);
                }}
              />
            )}
            {onEdit && (
              <EditIcon
                className="ml-2 mt-1 text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(id);
                }}
              />
            )}
          </div>
          <div className="">
            <div>
              <div className="flex items-center gap-1">
                <BedroomIcon />
                <p className="text-sm">
                  {bedrooms > 1 ? `${bedrooms} Bedrooms` : '1 Bedroom'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <BathroomIcon />
                <p className="text-sm">
                  {bathrooms > 1 ? `${bathrooms} Bathrooms` : '1 Bathroom'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
