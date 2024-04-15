/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { getAuth, updateProfile } from 'firebase/auth';
import { FaUser as UsernameIcon } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import app, { db } from '../../firebase.config';
import Spinner from '../../components/Spinner/Spinner';

function Profile() {
  const auth = getAuth(app);
  const [changeDetails, setChangeDetails] = useState(true);
  const [user] = useState({
    name: auth.currentUser!.displayName,
    email: auth.currentUser!.email,
  });
  const { register, control, watch, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const { email } = user;

  const { username } = watch();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  const handleChangeDetails = async () => {
    try {
      if (auth.currentUser?.displayName !== username) {
        // Update display name
        await updateProfile(auth.currentUser!, {
          displayName: username,
        });

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser!.uid);
        await updateDoc(userRef, {
          username,
        });
        toast.success('Profile updated successfully!');
      }
      setChangeDetails((prevState) => !prevState);
    } catch (error) {
      toast.error('Could not update profile');
    }
  };

  const handleFormSubmit = () => {
    if (changeDetails) {
      handleChangeDetails();
    }
    setChangeDetails((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto p-4">
      <header className="pb-6 text-center md:text-left">
        <h1 className="text-3xl font-semibold uppercase tracking-wide">My Profile</h1>
      </header>
      <main>
        <div className="space-y-3 rounded-sm p-4 shadow-lg">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
            <div className="flex items-center justify-between">
              <p>Personal Details</p>
              <button type="submit" className="btn btn-outline btn-sm">
                Change
              </button>
            </div>
            <label htmlFor="username" className="input input-bordered flex items-center gap-2">
              <UsernameIcon />
              <input
                {...register('username')}
                type="text"
                id="username"
                name="username"
                className="grow"
                placeholder="Username"
              />
            </label>
            <p>{email}</p>
          </form>

          <button type="button" className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </main>
      <DevTool control={control} />
    </div>
  );
}

export default Profile;
