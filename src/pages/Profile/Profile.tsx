/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import app, { db } from '../../firebase.config';

function Profile() {
  const auth = getAuth(app);
  const [changeDetails, setChangeDetails] = useState(true);
  const { register, control, watch, handleSubmit, setValue } = useForm({
    mode: 'onChange',
  });
  const { username, theme } = watch();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  const handleChangeDetails = async (data) => {
    try {
      if (auth.currentUser?.displayName !== username) {
        // Update display name
        await updateProfile(auth.currentUser!, {
          displayName: data.username,
        });

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser!.uid);
        await updateDoc(userRef, {
          username: data.username,
          theme: data.theme,
        });
        toast.success('Profile updated successfully!');
      }
      setChangeDetails((prevState) => !prevState);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Could not update profile');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="pb-6 text-center md:text-left">
        <h1 className="text-3xl font-semibold uppercase tracking-wide">My Profile</h1>
        {username}
      </header>
      <main className="space-y-2">
        <div className="rounded-sm p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <p>Personal Details</p>
            <button type="button" onClick={() => setChangeDetails(!changeDetails)} className="btn btn-outline btn-sm">
              {changeDetails ? '  Change' : 'Done'}
            </button>
          </div>
          <div className={changeDetails ? 'block' : 'hidden'}>
            <form onSubmit={handleSubmit(handleChangeDetails)}>
              <label htmlFor="username" className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  {...register('username')}
                  type="text"
                  id="username"
                  name="username"
                  className="grow"
                  placeholder="Username"
                  value={username}
                />
              </label>
              <div className="space-y-2">
                <p>Change your theme</p>
                <div className="form-control">
                  <label htmlFor="field-theme" className="label cursor-pointer gap-4">
                    <span className="label-text">Default</span>
                    <input type="radio" {...register('theme')} className="theme-controller radio" value="default" />
                  </label>
                </div>
                <div className="form-control">
                  <label htmlFor="field-theme" className="label cursor-pointer gap-4">
                    <span className="label-text">Retro</span>
                    <input type="radio" {...register('theme')} className="theme-controller radio" value="retro" />
                  </label>
                </div>
                <div className="form-control">
                  <label htmlFor="field-theme" className="label cursor-pointer gap-4">
                    <span className="label-text">Cyberpunk</span>
                    <input type="radio" {...register('theme')} className="theme-controller radio" value="cyberpunk" />
                  </label>
                </div>
                <div className="form-control">
                  <label htmlFor="field-theme" className="label cursor-pointer gap-4">
                    <span className="label-text">Valentine</span>
                    <input type="radio" {...register('theme')} className="theme-controller radio" value="valentine" />
                  </label>
                </div>
                <div className="form-control">
                  <label htmlFor="field-theme" className="label cursor-pointer gap-4">
                    <span className="label-text">Aqua</span>
                    <input type="radio" {...register('theme')} className="theme-controller radio" value="aqua" />
                  </label>
                </div>
              </div>
              <button type="submit">Save Changes</button>
            </form>
          </div>
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
