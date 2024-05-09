import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Keyboard, A11y } from 'swiper/modules';
import { db } from '../../../firebase.config';
import Spinner from '../../Spinner/Spinner';
import 'swiper/css/bundle';
import { ListingType } from '../../../types/app.types';
import FetchedDataTypes from '../../../pages/Category/Category.types';

function ExplorerSlider() {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState<FetchedDataTypes[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      const listingsArr: FetchedDataTypes[] = [];

      querySnap.forEach((doc) => {
        return listingsArr.push({
          id: doc.id,
          data: doc.data() as ListingType,
        });
      });

      setListings(listingsArr);
      setIsLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <div className="my-6">
      {isLoading && <Spinner />}
      {listings && (
        <div>
          <p className="text-lg font-semibold">Recommended Listings</p>
          <Swiper
            spaceBetween={30}
            centeredSlides
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            keyboard={{
              enabled: true,
            }}
            modules={[Autoplay, Pagination, Keyboard, A11y]}
            className="mySwiper"
          >
            {listings.map((listing) => {
              const { data, id } = listing;
              return (
                <SwiperSlide
                  key={id}
                  onClick={() => navigate(`/category/${data.type}/${id}`)}
                >
                  <div
                    className="h-64 w-full cursor-pointer rounded-md bg-cover bg-center"
                    style={{ backgroundImage: `url(${data.imageUrls[0]}` }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default ExplorerSlider;
