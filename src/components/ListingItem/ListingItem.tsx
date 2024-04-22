import { Link } from 'react-router-dom';
import { FaBath as BathroomIcon } from 'react-icons/fa';
import { IoIosBed as BedroomIcon } from 'react-icons/io';
import { ListingItemProps } from './ListingItem.types';

function ListingItem({ listing }: ListingItemProps) {
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
          <p className="pt-1 text-sm font-semibold text-primary">
            $
            {offer
              ? discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {type === 'rent' && ' / Month'}
          </p>

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
      </Link>
      {/* Add on delete incon */}
    </li>
  );
}

export default ListingItem;
