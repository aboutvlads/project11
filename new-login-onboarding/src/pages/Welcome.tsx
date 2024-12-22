import React from 'react';
import { ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SocialButton from '../components/SocialButton';
import Divider from '../components/Divider';

interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] bg-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#1B1B1B]">
            Create your account
          </h1>
        </div>

        <SocialButton
          icon={
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 flex-shrink-0"
            />
          }
          onClick={() => {}}
          className="whitespace-nowrap"
        >
          Continue with Google
        </SocialButton>

        <Divider text="Or continue with email" />

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email*"
            className="w-full px-4 py-3 rounded-xl border-2 border-[#E5E5E5] focus:border-[#1B1B1B] outline-none transition-colors"
          />

          <Button variant="secondary" onClick={onNext}>
            Get started <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-[#757575] text-center">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#1B1B1B] underline hover:text-black">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#1B1B1B] underline hover:text-black">
            Privacy Policy
          </a>
        </p>
      </Card>
    </div>
  );
}