import { Link } from 'react-router-dom';
import {
  BriefcaseIcon,
  UsersIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const Landing = () => {
  const features = [
    {
      icon: BriefcaseIcon,
      title: 'Find Your Dream Job',
      description:
        'Browse thousands of developer positions from top companies worldwide.',
    },
    {
      icon: UsersIcon,
      title: 'Hire Top Talent',
      description:
        'Connect with skilled developers and build your dream team effortlessly.',
    },
    {
      icon: ChartBarIcon,
      title: 'Track Progress',
      description:
        'Monitor applications, manage candidates, and make data-driven decisions.',
    },
  ];

  const benefits = [
    'Easy application process',
    'Direct communication with recruiters',
    'Competitive salary packages',
    'Remote work opportunities',
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-textPrimary mb-6 leading-tight">
            Where <span className="text-primary">Developers</span>
            <br />
            Meet Opportunities
          </h1>
          <p className="text-xl text-textSecondary mb-8 max-w-3xl mx-auto">
            DevHire connects talented developers with forward-thinking
            companies. Whether you're looking to hire or get hired, we've got
            you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 transition-colors font-semibold text-lg inline-flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="bg-surface text-textPrimary px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg border border-border"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface py-20 border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-textPrimary text-center mb-16">
            Everything you need to succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-textPrimary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-textSecondary">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-textPrimary mb-6">
              Why choose DevHire?
            </h2>
            <p className="text-lg text-textSecondary mb-8">
              We make hiring and job searching simple, efficient, and effective.
              Join thousands of developers and companies already using DevHire.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-textPrimary font-medium">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-white/90 mb-8">
              Join our community of developers and recruiters today.
            </p>
            <Link
              to="/register"
              className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Sign Up Now
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Developers' },
              { number: '5K+', label: 'Companies' },
              { number: '50K+', label: 'Jobs Posted' },
              { number: '95%', label: 'Success Rate' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-textSecondary font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-textPrimary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg"></div>
              <span className="text-xl font-bold">DevHire</span>
            </div>
            <p className="text-white/70">
              © 2024 DevHire. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
