import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import Explore from './pages/Explore/Explore';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Offers from './pages/Offers/Offers';
import Profile from './pages/Profile/Profile';
import CreateListing from './pages/CreateListing/CreateListing';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Listing from './pages/Listing/Listing';
import Contact from './pages/Contact/Contact';
import Category from './pages/Category/Category';
import Navbar from './components/layout/Navbar/Navbar';
import BottomNavbar from './components/layout/BottomNavbar/BottomNavbar';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AppContextProvider from './context/AppContext';

function App() {
  return (
    <AppContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/create-listing" element={<CreateListing />} />
        <Route
          path="/category/:categoryName/:listingId"
          element={<Listing />}
        />
        <Route path="/contact/:landlordId" element={<Contact />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* @TODO Not Found Page */}
      </Routes>
      <BottomNavbar />
      <ToastContainer position="bottom-left" />
    </AppContextProvider>

    // @TODO Footer
  );
}

export function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default App;
