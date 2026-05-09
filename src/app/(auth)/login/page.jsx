"use client";
import { authClient } from '@/lib/auth-client';
import { Check, Eye, EyeSlash } from '@gravity-ui/icons';
import { Button, FieldError, Form, Input, InputGroup, Label, TextField, toast } from '@heroui/react';
import { a } from 'framer-motion/client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { handleSubmit, control } = useForm();

  const handleSubmitData = async (data) => {
    const { email, password } = data;
    const { data: user, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      alert("Login Error: " + error.message);
    } else {
      alert("Login Successfully");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login your account
        </h1>
        <hr className="mb-10 border-gray-100" />

        <Form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit(handleSubmitData)}>
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                isRequired
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label>Email</Label>
                <Input {...field} type="email" placeholder="Enter your email" />
                <FieldError />
              </TextField>
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                isRequired
                className="w-full"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  return null;
                }}
              >
                <Label>Password</Label>
                <InputGroup>
                  <InputGroup.Input
                    {...field}
                    className="w-full"
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <InputGroup.Suffix className="pr-0">
                    <Button
                      isIconOnly
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
                <FieldError />
              </TextField>
            )}
          />

          <Button type="submit" className="w-full bg-stone-800">
            <Check />
            Login
          </Button>
        </Form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Don't Have An Account?{" "}
            <Link href="/register" className="text-red-500 hover:underline font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;