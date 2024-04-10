import { Link } from 'react-router-dom';
import { FaRegCompass as ExploreIcon } from 'react-icons/fa6';
import { IoIosPricetag as OffersIcon } from 'react-icons/io';
import { FaUser as ProfileIcon } from 'react-icons/fa';

function BottomNavbar() {
  return (
    <nav>
      <div className="btm-nav">
        <Link to="/" className="active">
          <button type="button">
            <ExploreIcon />
          </button>
        </Link>
        <Link to="/offers">
          <button type="button">
            <OffersIcon />
          </button>
        </Link>
        <Link to="/profile">
          <button type="button">
            <ProfileIcon />
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default BottomNavbar;
