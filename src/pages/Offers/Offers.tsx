/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import ListingItem from '../../components/ListingItem/ListingItem';
import Spinner from '../../components/Spinner/Spinner';

function Offers() {
  const { isLoading, offerListings, fetchOffersListings } =
    useContext(AppContext);

  useEffect(() => {
    fetchOffersListings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? <Spinner /> : null}
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Offers</h1>
        <p className="pt-2">
          Explore our discounted featured offers. These properties are available
          for rent at reduced rates from their initial prices. Find your perfect
          living space today and seize the opportunity to save on your dream
          property.
        </p>
      </header>
      <main className="space-y-2">
        <ul className="space-y-4">
          {offerListings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Offers;
