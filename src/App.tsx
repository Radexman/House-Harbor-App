import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore/Explore';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Offers from './pages/Offers/Offers';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Navbar from './components/layout/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* @TODO Not Fund Page */}
        {/*  @TODO Mobile Navbar */}
      </Routes>
    </>
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
