import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Keyboard, A11y } from 'swiper/modules';
import { SwiperComponentProps } from './SwiperComponent.types';
import 'swiper/css/bundle';

function SwiperComponent({ imagesUrls }: SwiperComponentProps) {
  return imagesUrls.length < 2 ? (
    <div
      className="h-64 w-full bg-cover bg-center"
      style={{ background: `url(${imagesUrls[0]}) center no-repeat` }}
    />
  ) : (
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
      {imagesUrls.map((imageUrl) => (
        <SwiperSlide key={imageUrl}>
          <div
            className="h-60 w-full bg-cover bg-center md:h-[50vh]"
            style={{ backgroundImage: `url(${imageUrl}` }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComponent;
