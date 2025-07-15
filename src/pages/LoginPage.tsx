import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Chrome, Facebook } from 'lucide-react';
import LoginImage from '../assets/login_image.webp';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, clearError } from '../store/slices/authSlice';

interface LoginFormInputs {
  email: string;
  password: string;
  remember: boolean;
}

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await dispatch(
        loginUser({
          email: data.email,
          password: data.password,
        })
      ).unwrap();
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      // Error is already handled by Redux state
    }
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Header />
      <main className="flex items-center justify-center py-8">
        <div className="container mx-auto flex rounded-lg overflow-hidden max-w-4xl">
          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-[#282828] p-8">
            <h2 className="text-4xl font-bold mb-8">Login</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                {/* <label className="block mb-2 text-white font-medium">Email</label> */}
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none p-1 transition-colors text-white placeholder:text-[#B3B3B3]"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
              </div>
              <div>
                {/* <label className="block mb-2 text-white font-medium">Password</label> */}
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-[#1DB954] outline-none p-1 transition-colors text-white placeholder:text-[#B3B3B3]"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[#B3B3B3] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    {...register('remember')}
                    className="accent-[#1DB954] h-4 w-4 rounded border-[#535353] focus:ring-[#1DB954]"
                  />
                  Remember me
                </label>
                <Link to="#" className="text-[#1DB954] hover:underline text-sm font-medium">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" variant="primary" className="w-full text-lg font-bold py-3" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="flex items-center justify-center py-4">
              <span className="bg-[#282828] px-2 text-[#B3B3B3]">Or continue with</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Chrome className="w-10" />
              <Facebook className="w-10" />
            </div>
            <p className="mt-8 text-center text-[#B3B3B3]">
              Don't have an account?{' '}
              <Link to="/join" className="text-[#1DB954] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          {/* Image Section */}
          <div className="hidden md:block md:w-1/2 max-h-[32rem]">
            <img src={LoginImage} alt="Football Player" className="h-full w-full" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
