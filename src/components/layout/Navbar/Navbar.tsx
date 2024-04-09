import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <Link to="/" className="text-xl font-semibold ">
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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
              <div className="w-10 rounded-full">
                <img
                  alt="Users profile avatar"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-md bg-base-200 p-2 shadow-sm ">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create-listing">Create Listing</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
