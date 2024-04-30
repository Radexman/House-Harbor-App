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
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { AppContextPropTypes, ContextProps } from './AppContext.types';
import app, { db } from '../firebase.config';
import FetchedDataTypes from '../pages/Category/Category.types';
import { ListingType } from '../types/app.types';

export const AppContext = createContext({} as ContextProps);

function AppContextProvider({ children }: AppContextPropTypes) {
  const auth = getAuth(app);
  const [listings, setListings] = useState<FetchedDataTypes[]>([]);
  const [offerListings, setOfferListings] = useState<FetchedDataTypes[]>([]);
  const [singleListing, setSingleListing] = useState<ListingType>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };

  const handleChangeDetails = async (username: string) => {
    setIsLoading(true);
    if (auth.currentUser?.displayName !== username) {
      // Check if the desired username already exists in Firestore
      const userSnapshot = await getDoc(
        doc(db, 'users', auth.currentUser!.uid)
      );
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (userData?.username === username) {
          // Username is the same as the current one, no need to update
          toast.error('Please choose a different username');
          return;
        }
      }

      // Update display name
      await updateProfile(auth.currentUser!, {
        displayName: username,
      });

      // Update in Firestore
      const userRef = doc(db, 'users', auth.currentUser!.uid);
      await updateDoc(userRef, {
        username,
      });
      toast.success('Username updated');
    } else {
      toast.error('The new username is the same as the current one');
    }
    setIsLoading(false);
  };

  // Handle phone number change
  const handleChangePhoneNumber = async (phoneNumber: number) => {
    setIsLoading(true);
    const userRef = doc(db, 'users', auth.currentUser!.uid);
    await updateDoc(userRef, {
      phoneNumber,
    });
    toast.success('Phone number updated');
    setIsLoading(false);
  };

  // Fetch listings for each category
  const fetchListings = async (category: string | undefined) => {
    try {
      setIsLoading(true);
      // Get refference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', category),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

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

  // Fetch listings for offers page
  const fetchOffersListings = async () => {
    try {
      setIsLoading(true);

      // Get reference
      const listingsRef = collection(db, 'listings');

      // Create a query
      const q = query(
        listingsRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const listingsArr: FetchedDataTypes[] = [];

      querySnap.forEach((doc) => {
        return listingsArr.push({
          id: doc.id,
          data: doc.data() as ListingType,
        });
      });

      setOfferListings(listingsArr);
      setIsLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  };

  // Fetch single listing
  const fetchSingleListing = async (listingId: string | undefined) => {
    setIsLoading(true);
    if (!listingId) {
      toast.error('This listing does not exist');
      return;
    }
    const docRef = doc(db, 'listings', listingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setSingleListing(docSnap.data() as ListingType);

      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error('This listing does not exist');
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

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          username: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
          userRef: user.uid,
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
        offerListings,
        singleListing,
        onGoogleClick,
        fetchListings,
        fetchOffersListings,
        fetchSingleListing,
        handleLogout,
        handleChangeDetails,
        handleChangePhoneNumber,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
