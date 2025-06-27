import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Chrome, Facebook } from 'lucide-react';
import RegisterImage from '../assets/register_image.webp';
import { Button } from '../components/Button';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();
  const password = watch('password');

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log(data);
    // Handle registration logic here
  };

  return (
    <div className="bg-[#121212]">
      <Header />
      <main className="text-white flex items-center justify-center py-8">
        <div className="container mx-auto flex rounded-lg overflow-hidden max-w-5xl">
          {/* Image Section */}
          <div className="hidden md:block md:w-1/2 max-h-[32rem]">
            <img src={RegisterImage} alt="F1 Driver" className="object-cover h-full w-full" />
          </div>
          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-brand-dark-gray p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-8">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-brand-green outline-none p-1 transition-colors"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>}
              </div>
              <div>
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
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-brand-green outline-none p-1 transition-colors"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-brand-green outline-none p-1 transition-colors"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message as string}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  className="w-full bg-transparent border-b-2 border-[#535353] focus:border-brand-green outline-none p-1 transition-colors"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message as string}</p>
                )}
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Sign Up
              </Button>
            </form>

            <div className="flex items-center justify-center py-4">
              <span className="bg-brand-dark-gray px-2 text-brand-gray">Or continue with</span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Chrome className="w-10" />
              <Facebook className="w-10" />
            </div>

            <p className="mt-8 text-center text-brand-gray">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-green font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
