import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { AppContext } from '../../context/AppContext';

function OAuth() {
  const { onGoogleClick } = useContext(AppContext);
  const location = useLocation();

  return (
    <div className="text-center">
      <button onClick={onGoogleClick} type="button" className="btn btn-outline btn-primary w-full">
        Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with
        <GoogleIcon />
        account
      </button>
    </div>
  );
}

export default OAuth;
