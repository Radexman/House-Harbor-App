import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { IoShareSocialSharp as ShareIcon } from 'react-icons/io5';
import { AppContext } from '../../context/AppContext';
import app from '../../firebase.config';
import Spinner from '../../components/Spinner/Spinner';

function Listing() {
  const { fetchSingleListing, singleListing, isLoading } =
    useContext(AppContext);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth(app);

  useEffect(() => {
    fetchSingleListing(params.listingId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, params.listingId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!singleListing) {
    return <div>No data found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      {/* SLIDER */}
      <div className="flex justify-between pt-4">
        <h1 className="text-3xl font-semibold">{singleListing.name}</h1>
        <div className="fixed right-4">
          <button
            type="button"
            className="btn tooltip tooltip-left rounded-full"
            data-tip="Share Listing"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setShareLinkCopied(true);

              setTimeout(() => {
                setShareLinkCopied(false);
              }, 2000);
            }}
          >
            <ShareIcon />
          </button>
          {shareLinkCopied && (
            <p className="fixed right-4 mt-2 text-sm">Link Copied</p>
          )}
        </div>
      </div>
      <p className="text-xl font-semibold">{singleListing.location}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold">
          $
          {singleListing.offer
            ? singleListing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : singleListing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <div className="badge badge-primary">
          For {singleListing.type === 'rent' ? 'Rent' : 'Sale'}
        </div>
        {singleListing.offer && (
          <div className="badge badge-secondary badge-outline">
            ${singleListing.regularPrice - singleListing.discountedPrice}{' '}
            discount
          </div>
        )}
      </div>
      <div className="my-6">
        <h2 className="text-xl font-semibold">Home Equipment</h2>
        <ul className="my-2 space-y-1 text-sm font-semibold">
          <li>
            {singleListing.bedrooms > 1
              ? `${singleListing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {singleListing.bathrooms > 1
              ? `${singleListing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{singleListing.parking && 'Parking Spot'}</li>
          <li>{singleListing.furnished && 'Furnished'}</li>
        </ul>
      </div>
      <div className="my-6">
        <h2 className="text-xl font-semibold">Location</h2>
        {/* Map */}
      </div>
      <div className="my-6">
        {auth.currentUser?.uid !== singleListing.userRef && (
          <button type="button" className="btn btn-primary">
            <Link
              to={`/contact/${singleListing.userRef}?listingName=${singleListing.name}`}
            >
              Contact Landlord
            </Link>
          </button>
        )}
      </div>
    </main>
  );
}

export default Listing;
