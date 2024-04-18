/* eslint-disable react/jsx-props-no-spreading */
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { getAuth } from 'firebase/auth';
import { FaUser as UsernameIcon } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/AppContext';
import app from '../../firebase.config';
import bgImage from '../../assets/images/the-bialons-x_CEJ7kn4w4-unsplash.jpg';

function Profile() {
  const { handleChangeDetails, handleLogout } = useContext(AppContext);
  const auth = getAuth(app);
  const [user] = useState({
    name: auth.currentUser!.displayName,
    email: auth.currentUser!.email,
  });
  const { register, control, watch, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const { email } = user;

  const { username } = watch();

  const handleFormSubmit = () => {
    if (username !== '') {
      handleChangeDetails(username);
    } else {
      toast.error('Please provide correct username');
    }
  };

  return (
    <div>
      <main className="space-y-2">
        <div className="hero min-h-[93vh]" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="hero-overlay bg-opacity-90 sm:bg-opacity-70" />
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-md p-4 sm:bg-primary-content sm:bg-opacity-30 ">
              <div className="space-y-3 rounded-lg p-4 shadow-xl">
                <h1 className="text-3xl font-semibold uppercase tracking-wide">{`${user.name}'s profile`}</h1>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl">Personal Details</h2>
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
            </div>
          </div>
        </div>
      </main>
      <DevTool control={control} />
    </div>
  );
}

export default Profile;
