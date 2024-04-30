import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAuth } from 'firebase/auth';
import { IoShareSocialSharp as ShareIcon } from 'react-icons/io5';
import { AppContext } from '../../context/AppContext';
import { refactorCurrency } from '../../utils/helpers';
import app from '../../firebase.config';
import Spinner from '../../components/Spinner/Spinner';
import 'swiper/css';

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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);

    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!singleListing) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="fixed right-4 top-4 z-10 md:top-20">
        <button
          type="button"
          className="btn tooltip tooltip-left rounded-full"
          data-tip="Share Listing"
          onClick={handleCopyLink}
        >
          <ShareIcon />
        </button>
        {shareLinkCopied && (
          <p className="fixed right-4 mt-2 text-sm">Link Copied</p>
        )}
      </div>
      <div className="">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {singleListing.imageUrls.map((imageUrl) => (
            <SwiperSlide key={imageUrl}>
              <div
                className="h-64 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl}` }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <main className="container mx-auto mb-12 p-4">
        <div className="flex justify-between pt-4">
          <h1 className="text-3xl font-semibold">{singleListing.name}</h1>
        </div>
        <p className="text-xl font-semibold">{singleListing.location}</p>
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">
            $
            {singleListing.offer
              ? refactorCurrency(singleListing.discountedPrice)
              : refactorCurrency(singleListing.regularPrice)}
          </p>
          <div className="badge badge-primary">
            For {singleListing.type === 'rent' ? 'Rent' : 'Sale'}
          </div>
          {singleListing.offer && (
            <div className="badge badge-secondary badge-outline">
              $
              {refactorCurrency(
                singleListing.regularPrice - singleListing.discountedPrice
              )}{' '}
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
          <div className="h-52">
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              center={[
                singleListing.geolocation.lat,
                singleListing.geolocation.lng,
              ]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              />

              <Marker
                position={[
                  singleListing.geolocation.lat,
                  singleListing.geolocation.lng,
                ]}
              >
                <Popup>{singleListing.location}</Popup>
              </Marker>
            </MapContainer>
          </div>
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
    </div>
  );
}

export default Listing;
