import { useEffect, useState } from 'react';
import { User, getAuth } from 'firebase/auth';
import app from '../../firebase.config';
import ThemeToggler from '../../components/layout/ThemeToggler/ThemeToggler';

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);
  useEffect(() => {
    setUser(auth.currentUser);
  }, []);
  return (
    <div className="container mx-auto p-4">
      <header className="pb-6 text-center md:text-left">
        <h1 className="text-3xl font-semibold uppercase tracking-wide">Profile</h1>
      </header>
      <main className="space-y-2">
        <div>{user ? <h2>{user.displayName}</h2> : <h2>Not logged in</h2>}</div>
        <ThemeToggler />
      </main>
    </div>
  );
}

export default Profile;
