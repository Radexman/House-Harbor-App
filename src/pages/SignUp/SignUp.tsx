/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { DevTool } from '@hookform/devtools';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaLongArrowAltRight as ArrowIcon,
  FaEye as VisibleIcon,
  FaEnvelope as EmailIcon,
  FaLock as PasswordIcon,
  FaUser as UsernameIcon,
} from 'react-icons/fa';
import { FaEyeSlash as NotVisibleIcon } from 'react-icons/fa6';
import app, { db } from '../../firebase.config';
import bgImage from '../../assets/images/the-bialons-x_CEJ7kn4w4-unsplash.jpg';
import SignUpFormTypes from './SignUp.types';
import OAuth from '../../components/OAuth/OAuth';

function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, control, handleSubmit, watch } = useForm<SignUpFormTypes>({
    mode: 'onChange',
  });
  const { email, password, username } = watch();
  const navigate = useNavigate();

  const toggleVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  const handleFormSubmit = async () => {
    try {
      const auth = getAuth(app);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      updateProfile(auth.currentUser!, {
        displayName: username,
      });

      const formData = {
        email,
        username,
        timestamp: serverTimestamp(),
        userRef: user.uid,
      };

      await setDoc(doc(db, 'users', user.uid), formData);

      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };

  return (
    <div>
      <main className="space-y-2">
        <div
          className="hero min-h-[93vh]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="hero-overlay bg-opacity-80 sm:bg-opacity-70" />
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-md p-4 sm:bg-primary-content sm:bg-opacity-30 ">
              <header className="space-y-3 pb-2 text-center">
                <h1 className="text-3xl font-semibold uppercase tracking-wide">
                  Create Account
                </h1>
                <p className="px-4 font-semibold">
                  You can create an account at House Harbor for free. Create
                  your profile with email or via Google account.
                </p>
              </header>
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="card-body"
              >
                <div className="form-control">
                  <label
                    htmlFor="username"
                    className="input input-bordered flex items-center gap-2"
                  >
                    <UsernameIcon />
                    <input
                      {...register('username')}
                      type="text"
                      id="username"
                      name="username"
                      className="grow"
                      placeholder="Username"
                      required
                    />
                  </label>
                </div>
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
                      {isPasswordVisible ? <VisibleIcon /> : <NotVisibleIcon />}
                    </button>
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot Password?
                </Link>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    <span>Sign Up</span>
                    <ArrowIcon />
                  </button>
                </div>
                <OAuth />
              </form>
              <div className="text-center text-sm">
                <p>Already have an account?</p>
                <Link to="/sign-in" className="underline hover:text-primary">
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DevTool control={control} />
    </div>
  );
}

export default SignUp;
