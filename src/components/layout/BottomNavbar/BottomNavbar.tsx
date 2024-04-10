import { Link, useLocation } from 'react-router-dom';
import { FaRegCompass as ExploreIcon } from 'react-icons/fa6';
import { IoIosPricetag as OffersIcon } from 'react-icons/io';
import { FaUser as ProfileIcon } from 'react-icons/fa';

function BottomNavbar() {
  const location = useLocation();

  const pathMathRoute = (route: string): string | undefined => {
    if (route === location.pathname) {
      return 'active text-primary';
    }
    return undefined;
  };

  return (
    <nav className="block md:hidden">
      <div className="btm-nav">
        <Link to="/" className={pathMathRoute('/')}>
          <button type="button">
            <ExploreIcon />
          </button>
        </Link>
        <Link to="/offers" className={pathMathRoute('/offers')}>
          <button type="button">
            <OffersIcon />
          </button>
        </Link>
        <Link to="/profile" className={pathMathRoute('/profile')}>
          <button type="button">
            <ProfileIcon />
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default BottomNavbar;
