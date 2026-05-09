"use client";
import { Check, Eye, EyeSlash } from '@gravity-ui/icons';
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from '@heroui/react';
import { toast } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { authClient } from '../../../lib/auth-client';

const RegisterPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // FIX #2: Removed react-hook-form entirely. Using HeroUI's native Form
  // with onSubmit's FormData so validation and submission are coordinated.
  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const photo = formData.get('photo');

    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photo || undefined,
        callbackURL: '/',
      });

      if (error) {
        // FIX #5: Use toast instead of alert()
        alert('Signup failed: ' + error.message);
      } else {
        alert('Account created successfully!');
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      // FIX #6: Always release loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register your account
        </h1>

        <hr className="mb-10 border-gray-100" />

        {/* FIX #7: Use w-full instead of hardcoded w-96 */}
        <Form className="flex w-full flex-col gap-4" onSubmit={handleSubmitRegister}>

          {/* Name Field */}
          <TextField
            isRequired
            name="name"
            type="text"
            // FIX #1: validate is on TextField, not on Input
            validate={(value) => {
              if (!value || value.trim().length < 2) {
                return 'Name must be at least 2 characters';
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* Photo Field — FIX #4: Added URL format validation */}
          <TextField
            name="photo"
            type="url"
            validate={(value) => {
              if (!value) return null; // optional field
              try {
                new URL(value);
                return null;
              } catch {
                return 'Please enter a valid URL (e.g. https://example.com/photo.jpg)';
              }
            }}
          >
            <Label>Photo URL <span className="text-gray-400 text-xs">(optional)</span></Label>
            <Input placeholder="https://example.com/photo.jpg" />
            <FieldError />
          </TextField>

          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            // FIX #1: validate on TextField
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="Enter your email" />
            <FieldError />
          </TextField>

          {/* Password Field */}
          {/* FIX #1: validate moved to TextField   FIX #3: added isRequired */}
          <TextField
            className="w-full"
            name="password"
            isRequired
            validate={(value) => {
              if (!value || value.length < 8) {
                return 'Password must be at least 8 characters';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <InputGroup>
              <InputGroup.Input
                className="w-full"
                type={isVisible ? 'text' : 'password'}
                placeholder="Enter your password"
              />
              <InputGroup.Suffix className="pr-0">
                <Button
                  isIconOnly
                  aria-label={isVisible ? 'Hide password' : 'Show password'}
                  size="sm"
                  variant="ghost"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
            <FieldError />
          </TextField>

          {/* FIX #6: Disable button while loading to prevent double-submit */}
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              className="w-full bg-stone-800"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {!isLoading && <Check />}
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </div>
        </Form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Already Have An Account?{' '}
            <Link href="/login" className="text-red-500 hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;