import { Link } from 'react-router-dom';
import {
  FaTwitter as TwitterIcon,
  FaFacebookSquare as FacebookIcon,
  FaYoutube as YouTubeIcon,
} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer mb-10 bg-base-300 p-10 text-base-content">
      <nav>
        <p className="text-lg font-semibold tracking-wide">Menu</p>
        <Link to="/">Explore</Link>
        <Link to="/offers">Offers</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <nav>
        <p className="text-lg font-semibold tracking-wide">Listings</p>
        <Link to="/category/sale">For Sale</Link>
        <Link to="/category/rent">For Rent</Link>
        <Link to="/offers">Discounts</Link>
      </nav>
      <nav>
        <p className="text-lg font-semibold tracking-wide">Social</p>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://twitter.com/?lang=pl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon size={25} />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon size={30} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon size={25} />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
