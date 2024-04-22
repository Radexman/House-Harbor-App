/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
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

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, watch, handleSubmit, control } =
    useForm<ForgotPasswordType>({
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
    // @TODO Refactor this section so that it looks like login / register page
    <>
      {isLoading ? <Spinner /> : null}
      <div className="container mx-auto p-4">
        <header className="pb-6 text-center md:text-left">
          <h1 className="text-3xl font-semibold uppercase tracking-wide">
            Forgot Password
          </h1>
        </header>
        <main>
          <div className="mb-3 space-y-2 rounded-sm p-4 text-center shadow-lg md:text-left">
            <p>
              Have you forgot your password? Worry not, simply input your email
              address and you will get reset link.
            </p>
            <form
              onSubmit={handleSubmit(handleForgotPassword)}
              className="space-y-2"
            >
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
              <button type="submit" className="btn btn-primary btn-wide">
                Send Reset Link
                <ArrowIcon />
              </button>
            </form>
          </div>
          <div className="text-center text-sm">
            <p>Already have an account?</p>
            <Link to="/sign-in" className="underline hover:text-primary">
              Sign in instead
            </Link>
          </div>
        </main>
        <DevTool control={control} />
      </div>
    </>
  );
}

export default ForgotPassword;
