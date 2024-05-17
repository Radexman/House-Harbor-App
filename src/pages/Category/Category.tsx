/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ListingItem from '../../components/ListingItem/ListingItem';
import Spinner from '../../components/Spinner/Spinner';

function Category() {
  const {
    listings,
    fetchListings,
    onFetchMoreListings,
    lastFetchedListing,
    isLoading,
  } = useContext(AppContext);
  const [spinnerVisible, setSpinnerVisible] = useState(true);

  const params = useParams();

  useEffect(() => {
    fetchListings(params.categoryName);
  }, [params.categoryName]);

  useEffect(() => {
    const spinnerTimeout = setTimeout(() => {
      setSpinnerVisible(false);
    }, 1000);

    return () => clearTimeout(spinnerTimeout);
  }, [isLoading]);

  return (
    <div className="container mx-auto p-4">
      <header className="pb-4 text-center md:text-left">
        <h1 className="text-3xl font-semibold uppercase tracking-wide">{`Places For ${
          params.categoryName === 'sale' ? 'Sale' : 'Rent'
        }`}</h1>
      </header>
      <div>
        <main className="min-h-screen space-y-2">
          {isLoading && spinnerVisible ? (
            <Spinner />
          ) : (
            <div>
              {listings && listings.length === 0 && !isLoading && (
                <p>No listings for this category</p>
              )}
              {!isLoading && listings && listings.length > 0 && (
                <ul className="space-y-4">
                  {listings.map((listing) => (
                    <ListingItem key={listing.id} listing={listing} />
                  ))}
                </ul>
              )}
            </div>
          )}
        </main>
        {lastFetchedListing && (
          <button
            onClick={() => onFetchMoreListings(params.categoryName)}
            type="button"
            className="btn btn-outline btn-primary btn-wide mt-4"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Category;
