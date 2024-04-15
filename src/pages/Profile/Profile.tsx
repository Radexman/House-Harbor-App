import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { getAuth } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import app from '../../firebase.config';
import ThemeToggler from '../../components/layout/ThemeToggler/ThemeToggler';

function Profile() {
  const auth = getAuth(app);

  const [user, setUser] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = user;

  const { register, control, watch, handleSubmit } = useForm({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  return (
    <div className="container mx-auto p-4">
      <header className="pb-6 text-center md:text-left">
        <h1 className="text-3xl font-semibold uppercase tracking-wide">My Profile</h1>
      </header>
      <main className="space-y-2">
        <div>
          <button type="button" className="btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {/* <ThemeToggler /> */}
      </main>
      <DevTool control={control} />
    </div>
  );
}

export default Profile;
