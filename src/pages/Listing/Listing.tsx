import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { IoShareSocialSharp as ShareIcon } from 'react-icons/io5';
import { toast } from 'react-toastify';
import app, { db } from '../../firebase.config';
import Spinner from '../../components/Spinner/Spinner';
import { ListingType } from '../../types/app.types';

function Listing() {
  const [listing, setListing] = useState<ListingType>({} as ListingType);
  const [isLoading, setIsLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth(app);

  useEffect(() => {
    const fetchListing = async () => {
      if (!params.listingId) {
        toast.error('This resource does not exist');
        return;
      }
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data() as ListingType);
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!listing) {
    return <div>No data found</div>;
  }

  return (
    <main className="container mx-auto p-4">
      {/* SLIDER */}
      <div className="flex justify-between pt-4">
        <h1 className="text-3xl font-semibold">{listing.name}</h1>
        <button
          type="button"
          className="btn tooltip tooltip-bottom rounded-full"
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
      </div>
      <div className="flex justify-between">
        <div />
        {shareLinkCopied && <p className="-mr-4 text-sm">Link Copied</p>}
      </div>
      <p className="text-xl font-semibold">{listing.location}</p>
      <div className="flex items-center gap-2">
        <p className="text-xl font-semibold">
          $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <div className="badge badge-primary">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </div>
        {listing.offer && (
          <div className="badge badge-secondary badge-outline">
            ${listing.regularPrice - listing.discountedPrice} discount
          </div>
        )}
      </div>
      <div className="my-6">
        <h2 className="text-xl font-semibold">Home Equipment</h2>
        <ul className="my-2 space-y-1 text-sm font-semibold">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
      </div>
      <div className="my-6">
        <h2 className="text-xl font-semibold">Location</h2>
        {/* Map */}
      </div>
      <div className="my-6">
        {auth.currentUser?.uid !== listing.userRef && (
          <button type="button" className="btn btn-primary">
            <Link
              to={`/contact/${listing.userRef}?listingName=${listing.name}`}
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
