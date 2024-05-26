import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="hidden md:block">
      <div className="navbar h-[5vh] bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/" className="font-logo text-3xl font-bold tracking-wider">
            House Harbor
          </Link>
        </div>
        <div className="flex-none gap-2">
          <Link to="/" className="btn btn-ghost">
            Explore
          </Link>
          <Link to="/offers" className="btn btn-ghost">
            Offers
          </Link>
          <Link to="/profile" className="btn btn-ghost">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
