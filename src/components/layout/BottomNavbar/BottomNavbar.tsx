import { Link, useLocation } from 'react-router-dom';
import { FaRegCompass as ExploreIcon } from 'react-icons/fa6';
import { IoIosPricetag as OffersIcon } from 'react-icons/io';
import { FaUser as ProfileIcon } from 'react-icons/fa';

function BottomNavbar() {
  const location = useLocation();

  const setActiveNavButton = (route: string): string | undefined => {
    if (route === location.pathname) {
      return 'active text-primary bg-base-200';
    }
    return undefined;
  };

  return (
    <nav className="block md:hidden">
      <div className="btm-nav bg-base-200">
        <Link to="/" className={setActiveNavButton('/')}>
          <button type="button">
            <ExploreIcon size={20} />
          </button>
        </Link>
        <Link to="/offers" className={setActiveNavButton('/offers')}>
          <button type="button">
            <OffersIcon size={20} />
          </button>
        </Link>
        <Link to="/profile" className={setActiveNavButton('/profile')}>
          <button type="button">
            <ProfileIcon size={20} />
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default BottomNavbar;
