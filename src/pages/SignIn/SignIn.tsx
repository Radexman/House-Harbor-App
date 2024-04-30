/* eslint-disable react/jsx-props-no-spreading */
import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaLongArrowAltRight as ArrowIcon,
  FaEye as VisibleIcon,
  FaEnvelope as EmailIcon,
  FaLock as PasswordIcon,
} from 'react-icons/fa';
import { FaEyeSlash as NotVisibleIcon } from 'react-icons/fa6';
import { AppContext } from '../../context/AppContext';
import app from '../../firebase.config';
import bgImage from '../../assets/images/the-bialons-x_CEJ7kn4w4-unsplash.jpg';
import SignInFormTypes from './SignIn.types';
import OAuth from '../../components/OAuth/OAuth';
import Spinner from '../../components/Spinner/Spinner';

function SignIn() {
  const { isLoading } = useContext(AppContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, handleSubmit, watch } = useForm<SignInFormTypes>({
    mode: 'onChange',
  });
  const { email, password } = watch();
  const navigate = useNavigate();

  const toggleVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  const handleFormSubmit = async () => {
    try {
      const auth = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Bad user credentials');
    }
  };

  return (
    <div>
      {isLoading ? <Spinner /> : null}
      <div className="space-y-2">
        <div
          className="hero min-h-[93vh]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="hero-overlay bg-opacity-80 sm:bg-opacity-70" />
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-md p-4 sm:bg-primary-content sm:bg-opacity-30 ">
              <header className="space-y-3 pb-2 text-center">
                <h1 className="text-3xl font-semibold uppercase tracking-wide">
                  Welcome Back
                </h1>
                <p className="px-4 font-semibold">
                  Good to see you back at House Harbor where we can address your
                  dreams. Login with your email or via Google account.
                </p>
              </header>
              <main>
                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="card-body"
                >
                  <div className="form-control">
                    <label
                      htmlFor="email"
                      className="input input-bordered flex items-center gap-2"
                    >
                      <EmailIcon />
                      <input
                        {...register('email')}
                        type="text"
                        id="email"
                        name="email"
                        className="grow"
                        placeholder="Email"
                        required
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label
                      htmlFor="password"
                      className="input input-bordered flex items-center gap-2"
                    >
                      <PasswordIcon />
                      <input
                        {...register('password')}
                        type={isPasswordVisible ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className="grow"
                        placeholder="Password"
                        required
                      />
                      <button type="button" onClick={toggleVisibility}>
                        {isPasswordVisible ? (
                          <VisibleIcon />
                        ) : (
                          <NotVisibleIcon />
                        )}
                      </button>
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                  <div className="form-control mt-6 w-full">
                    <button type="submit" className="btn btn-primary ">
                      <span>Sign in</span>
                      <ArrowIcon />
                    </button>
                  </div>
                  <OAuth />
                </form>
              </main>
              <div className="text-center text-sm">
                <p>
                  If you don&apos;t have an account you can create one for free.
                </p>
                <Link to="/sign-up" className="underline hover:text-primary">
                  Create free account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
