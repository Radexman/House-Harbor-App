import { Link } from 'react-router-dom';
import rentImage from '../../assets/images/interior-2.jpg';
import saleImage from '../../assets/images/house-1.jpg';
import ExplorerSlider from '../../components/layout/ExplorerSlider/ExplorerSlider';

function Explore() {
  return (
    <div className="container mx-auto mb-20 p-4">
      <header>
        <h1 className="text-center text-4xl font-semibold md:text-left">
          Explore
        </h1>
      </header>
      <main className="min-h-screen">
        <p className="py-2 text-justify md:text-left">
          Welcome to our House Harbor! Whether you&apos;re in search of your
          dream home to buy or a cozy place to rent, explore our diverse
          selection of listings. Browse through our collection of available
          properties categorized conveniently for sale or rent, and embark on
          your journey to find the perfect place to call home.
        </p>
        <ExplorerSlider />
        <p className="mb-1 text-lg font-semibold">Categories</p>
        <div className="mx-auto flex flex-col items-center justify-center gap-6 md:flex-row">
          <Link
            to="/category/sale"
            className="w-full rounded-md shadow-sm shadow-primary transition-all duration-200 hover:shadow-md hover:shadow-primary md:w-1/2"
          >
            <div className="card rounded-md bg-base-200 transition-all duration-200">
              <figure>
                <img src={saleImage} alt="Properties for sale page" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Properties For Sale</h2>
                <p>
                  Discover your dream home for sale here. Explore a variety of
                  houses on the market, from charming cottages to luxurious
                  estates.
                </p>
              </div>
            </div>
          </Link>
          <Link
            to="category/rent"
            className="w-full rounded-md shadow-sm shadow-primary transition-all duration-200 hover:shadow-md hover:shadow-primary md:w-1/2"
          >
            <div className="card rounded-md bg-base-200 transition-all duration-200">
              <figure>
                <img src={rentImage} alt="Properties for rent page" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Properties For Rent</h2>
                <p>
                  Find your perfect rental home here. Explore a range of houses
                  available for rent, from cozy apartments to spacious family
                  homes.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
