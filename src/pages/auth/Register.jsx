import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RoleSelector from '../../components/RoleSelector';
import Toast from '../../components/Toast';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const Register = () => {
  const [step, setStep] = useState(1); // 1: role selection, 2: signup form
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleContinue = () => {
    if (role) {
      setStep(2);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setToast({
        type: 'error',
        message: 'Passwords do not match!',
      });
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setToast({
        type: 'error',
        message: 'Password must be at least 6 characters long.',
      });
      return;
    }

    setLoading(true);
    setToast(null);

    try {
      const userData = await register(
        formData.name,
        formData.email,
        formData.password,
        role
      );

      // Show success message
      setToast({
        type: 'success',
        message: 'Account created successfully! Redirecting...',
      });

      // Navigate based on role after a short delay
      setTimeout(() => {
        switch (userData.role) {
          case 'developer':
            navigate('/developer/dashboard');
            break;
          case 'recruiter':
            navigate('/recruiter/dashboard');
            break;
          default:
            navigate('/');
        }
      }, 1000);
    } catch (error) {
      // Handle different error types
      let errorMessage = 'Registration failed. Please try again.';

      if (error.status === 400) {
        errorMessage = error.message || 'Please check your input fields.';
      } else if (error.status === 409) {
        errorMessage = 'An account with this email already exists.';
      } else if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      setToast({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-textPrimary mb-2">
            Create your account
          </h1>
          <p className="text-textSecondary">
            {step === 1
              ? 'Choose your role to get started'
              : 'Fill in your details'}
          </p>
        </div>

        <div className="bg-surface rounded-2xl shadow-lg border border-border p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 1
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-textSecondary'
                }`}
              >
                1
              </div>
              <div
                className={`h-1 w-16 ${
                  step >= 2 ? 'bg-primary' : 'bg-gray-200'
                }`}
              ></div>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= 2
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-textSecondary'
                }`}
              >
                2
              </div>
            </div>
          </div>

          {step === 1 ? (
            <>
              <RoleSelector
                selectedRole={role}
                onSelectRole={handleRoleSelect}
              />
              <button
                onClick={handleContinue}
                disabled={!role}
                className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    minLength={6}
                    disabled={loading}
                  />
                </div>
                <p className="mt-1 text-xs text-textSecondary">
                  Must be at least 6 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-textSecondary" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1 bg-gray-100 text-textPrimary py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-textSecondary">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Register;
