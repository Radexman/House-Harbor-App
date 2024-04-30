/* eslint-disable react/jsx-props-no-spreading */
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth } from 'firebase/auth';
import {
  FaUser as UsernameIcon,
  FaLongArrowAltRight as ArrowIcon,
  FaMobile as PhoneIcon,
} from 'react-icons/fa';
import { IoHome as HomeIcon } from 'react-icons/io5';
import { DevTool } from '@hookform/devtools';
import { IoIosCheckmarkCircle as CheckmarkIcon } from 'react-icons/io';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';
import app, { db } from '../../firebase.config';
import bgImage from '../../assets/images/the-bialons-x_CEJ7kn4w4-unsplash.jpg';
import Spinner from '../../components/Spinner/Spinner';

function Profile() {
  const {
    handleChangeDetails,
    handleChangePhoneNumber,
    handleLogout,
    isLoading,
  } = useContext(AppContext);
  const auth = getAuth(app);
  const [user] = useState({
    username: auth.currentUser!.displayName,
    email: auth.currentUser!.email,
    phoneNumber: auth.currentUser?.phoneNumber || '',
  });
  const [number, setNumber] = useState();
  const { register, watch, control } = useForm({
    mode: 'onChange',
  });
  const phoneNumberRegex =
    /^\+?\d{1,3}[-. (]?\d{1,3}[-. )]?\d{3,4}[-. ]?\d{4}$/;

  useEffect(() => {
    const getUser = async () => {
      const docRef = doc(db, 'users', auth.currentUser!.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNumber(docSnap.data().phoneNumber);
      } else {
        toast.error('Could not get user data');
      }
    };

    getUser();
  }, [auth.currentUser]);

  const { email, username } = user;

  const { formName, phone } = watch();

  const handleSubmitUsername = () => {
    if (formName === '' || null) {
      toast.error('Please provide a username');
      return;
    }

    handleChangeDetails(formName);
  };

  const handleSubmitPhoneNumber = async () => {
    if (!phoneNumberRegex.test(phone)) {
      toast.error('Please provide correct number');
      return;
    }

    handleChangePhoneNumber(phone);
  };

  return (
    <div>
      {isLoading ? <Spinner /> : null}
      <main className="space-y-2">
        <div
          className="hero min-h-[93vh]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="hero-overlay bg-opacity-90 sm:bg-opacity-70" />
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-md p-4 sm:bg-primary-content sm:bg-opacity-30 ">
              <div className="space-y-3 rounded-lg">
                <h1 className="text-3xl font-semibold uppercase tracking-wide">{`${username}'s profile`}</h1>
                <form className="space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl">Personal Details</h2>
                  </div>
                  <div className="form-control">
                    <label
                      htmlFor="formName"
                      className="input input-bordered flex items-center gap-2"
                    >
                      <UsernameIcon />
                      <input
                        {...register('formName')}
                        type="text"
                        id="formName"
                        name="formName"
                        className="grow"
                        placeholder="Username"
                        maxLength={30}
                      />
                      <button
                        type="button"
                        className={`btn btn-outline btn-primary btn-sm ${
                          formName?.length < 3 || formName === null
                            ? 'btn-disabled'
                            : null
                        }`}
                        onClick={handleSubmitUsername}
                      >
                        Change
                      </button>
                    </label>
                    {formName?.length < 3 || formName === null ? (
                      <p className="pt-1 text-xs ">
                        Username must be different from current one and needs to
                        have at least 3 characters
                      </p>
                    ) : (
                      <p className="animate-slideIn flex transform items-center pt-1 text-xs text-green-400 transition-transform">
                        Correct username length
                        <CheckmarkIcon
                          size={13}
                          className="ml-1 mt-1 text-green-400"
                        />
                      </p>
                    )}
                  </div>
                  <div className="form-control relative">
                    <div
                      data-tip="Correct number patterns +1 (123) 456-7890,
                123-456-7890,
                123 456 7890,
                1234567890,
                +1234567890,
                01234567890"
                      className="text-md badge tooltip absolute -top-8 right-0 flex  h-6 w-6 items-center justify-center rounded-full border border-primary font-semibold"
                    >
                      ?
                    </div>
                    <label
                      htmlFor="phone"
                      className="input input-bordered flex items-center gap-2"
                    >
                      <PhoneIcon />
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        name="phone"
                        className="grow"
                        placeholder="Phone number"
                      />
                      <button
                        type="button"
                        className={`btn btn-outline btn-primary btn-sm ${
                          !phoneNumberRegex.test(phone) ? 'btn-disabled' : null
                        }`}
                        onClick={handleSubmitPhoneNumber}
                      >
                        Change
                      </button>
                    </label>
                    {!phoneNumberRegex.test(phone) ? (
                      <p className="pt-1 text-xs ">
                        Phone number must be in correct format
                      </p>
                    ) : (
                      <p className="animate-slideIn flex transform items-center pt-1 text-xs text-green-400 transition-transform">
                        Correct phone number format
                        <CheckmarkIcon
                          size={13}
                          className="ml-1 mt-1 text-green-400"
                        />
                      </p>
                    )}
                  </div>
                  <ul>
                    <li>Email: {email}</li>
                    <li>Username: {username}</li>
                    <li>Phone Number: {number || 'Not yet added'}</li>
                  </ul>
                </form>
                <div className="flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
                  <Link to="/create-listing" className="w-full">
                    <button
                      type="button"
                      className="btn btn-primary w-full sm:btn-wide"
                    >
                      Create Listing
                      <HomeIcon />
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="btn w-full sm:btn-wide"
                    onClick={handleLogout}
                  >
                    Logout
                    <ArrowIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DevTool control={control} />
    </div>
  );
}

export default Profile;
