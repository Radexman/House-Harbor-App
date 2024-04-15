/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { AppContextPropTypes, ContextProps } from './AppContext.types';
import app, { db } from '../firebase.config';

export const AppContext = createContext({} as ContextProps);

function AppContextProvider({ children }: AppContextPropTypes) {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return <AppContext.Provider value={{ onGoogleClick }}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
