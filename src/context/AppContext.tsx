/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  collection,
  getDocs,
  doc,
  query,
  where,
  orderBy,
  updateDoc,
  limit,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { AppContextPropTypes, ContextProps } from './AppContext.types';
import app, { db } from '../firebase.config';
import FetchedDataTypes from '../pages/Category/Category.types';
import { ListingType } from '../types/app.types';

export const AppContext = createContext({} as ContextProps);

function AppContextProvider({ children }: AppContextPropTypes) {
  const auth = getAuth(app);
  const [listings, setListings] = useState<FetchedDataTypes[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  // Handle username change
  const handleChangeDetails = async (username: string) => {
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
    } catch (error) {
      toast.error('Could not update profile');
    }
  };

  // Fetch listings for each category
  const fetchListings = async (category: string | undefined) => {
    try {
      setIsLoading(true);
      // Get refference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(listingsRef, where('type', '==', category), orderBy('timestamp', 'desc'), limit(10));

      // Execute query
      const querySnap = await getDocs(q);

      const listingsArr: FetchedDataTypes[] = [];

      querySnap.forEach((doc) => {
        return listingsArr.push({
          id: doc.id,
          data: doc.data() as ListingType,
        });
      });

      setListings(listingsArr);
      setIsLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };

  // Sign up / sing in with Google
  const onGoogleClick = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);

      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        listings,
        onGoogleClick,
        fetchListings,
        handleLogout,
        handleChangeDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
