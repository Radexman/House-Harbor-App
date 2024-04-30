/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import {
  FaLongArrowAltRight as ArrowIcon,
  FaEnvelope as EmailIcon,
} from 'react-icons/fa';
import app from '../../firebase.config';
import ForgotPasswordType from './ForgotPassword.types';
import Spinner from '../../components/Spinner/Spinner';
import bgImage from '../../assets/images/the-bialons-x_CEJ7kn4w4-unsplash.jpg';

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, watch, handleSubmit } = useForm<ForgotPasswordType>({
    mode: 'onChange',
  });

  const { email } = watch();

  const handleForgotPassword = async (data: ForgotPasswordType) => {
    try {
      const auth = getAuth(app);
      setIsLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      setIsLoading(false);
      toast.success(`Email was sent to ${data.email}`);
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };
  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className="space-y-2">
        <div
          className="hero min-h-[93vh]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="hero-overlay bg-opacity-80 sm:bg-opacity-70" />
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-md p-4 sm:bg-primary-content sm:bg-opacity-30 ">
              <header className="pb-4 text-center md:text-left">
                <h1 className="text-3xl font-semibold uppercase tracking-wide">
                  Forgot Password
                </h1>
              </header>
              <main className="mb-3 space-y-2 rounded-sm text-center md:text-left">
                <p className="px-4 font-semibold">
                  Have you forgot your password? Worry not, simply input your
                  email address and you will get reset link.
                </p>
                <form
                  onSubmit={handleSubmit(handleForgotPassword)}
                  className="card-body space-y-2"
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
                        value={email}
                        className="grow"
                        placeholder="Email"
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <button type="submit" className="btn btn-primary">
                      Send Reset Link
                      <ArrowIcon />
                    </button>
                  </div>
                </form>
              </main>
              <div className="text-center text-sm">
                <p>Already have an account?</p>
                <Link to="/sign-in" className="underline hover:text-primary">
                  Sign in instead
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
