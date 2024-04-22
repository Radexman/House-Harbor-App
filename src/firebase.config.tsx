import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBWRqHJlIGHlol3aLI7m36F-j0CJYm05UA',
  authDomain: 'house-harbor.firebaseapp.com',
  projectId: 'house-harbor',
  storageBucket: 'house-harbor.appspot.com',
  messagingSenderId: '650997147856',
  appId: '1:650997147856:web:7af74df3f136f2364356d5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export default app;
