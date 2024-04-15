import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import { toast } from 'react-toastify';
import app, { db } from '../../firebase.config';
import Spinner from '../Spinner/Spinner';
import { AppContext } from '../../context/AppContext';

function OAuth() {
  const { onGoogleClick } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
