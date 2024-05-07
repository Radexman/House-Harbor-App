import { Link } from 'react-router-dom';
import {
  IoIosWarning as WarningIcon,
  IoIosHome as HomeIcon,
} from 'react-icons/io';

function NotFound() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex min-h-[90vh] flex-col items-center justify-center">
        <WarningIcon size={120} />
        <h1 className="text-center text-2xl font-bold tracking-wide">
          404 Page Not Found
        </h1>
        <Link to="/">
          <button type="button" className="btn btn-outline btn-primary mt-6">
            Back To Home Page
            <HomeIcon />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
