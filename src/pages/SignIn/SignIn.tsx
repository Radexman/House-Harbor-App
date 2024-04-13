/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaLongArrowAltRight as ArrowIcon,
  FaEye as VisibleIcon,
  FaEnvelope as EmailIcon,
  FaLock as PasswordIcon,
} from 'react-icons/fa';
import { FaEyeSlash as NotVisibleIcon } from 'react-icons/fa6';
import bgImage from '../../assets/images/the-bialons-x_CEJ7kn4w4-unsplash.jpg';

type FormDataTypes = {
  email: string;
  password: string;
};

function SignIn() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, control, handleSubmit } = useForm<FormDataTypes>({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const toggleVisibility = () => setIsPasswordVisible((prevState) => !prevState);

  const handleFormSubmit = (formData: FormDataTypes) => {
    console.log(formData);
  };

  return (
    <div>
      <main className="space-y-2">
        <div className="hero min-h-[93vh]" style={{ backgroundImage: `url(${bgImage})` }}>
          <div className="hero-overlay bg-opacity-80 sm:bg-opacity-70" />
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-md p-4 sm:bg-primary-content sm:bg-opacity-30 ">
              <header className="space-y-3 pb-2 text-center">
                <h1 className="text-3xl font-semibold uppercase tracking-wide">Welcome Back</h1>
                <p className="px-4 font-semibold">
                  Good to see you back at House Harbor where we can address your dreams. Login with your email or via
                  Google account.
                </p>
              </header>
              <form onSubmit={handleSubmit(handleFormSubmit)} className="card-body">
                <div className="form-control">
                  <label htmlFor="email" className="input input-bordered flex items-center gap-2">
                    <EmailIcon />
                    <input
                      {...register('email')}
                      type="text"
                      id="email"
                      name="email"
                      className="grow"
                      placeholder="Email"
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label htmlFor="password" className="input input-bordered flex items-center gap-2">
                    <PasswordIcon />
                    <input
                      {...register('password')}
                      type={isPasswordVisible ? 'text' : 'password'}
                      id="password"
                      name="password"
                      className="grow"
                      placeholder="Password"
                    />
                    <button type="button" onClick={toggleVisibility}>
                      {isPasswordVisible ? <VisibleIcon /> : <NotVisibleIcon />}
                    </button>
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    <span>Sign in</span>
                    <ArrowIcon />
                  </button>
                </div>
              </form>

              {/* Google OAuth */}
              <div className="text-center text-sm">
                <p>If you don&apos;t have an account you can create one for free.</p>
                <Link to="/sign-up" className="underline hover:text-primary">
                  Create free account
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

export default SignIn;
