"use client";
import { authClient } from '@/lib/auth-client';
import { Check, Eye, EyeSlash } from '@gravity-ui/icons';
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {register, handleSubmit} = useForm();
    const handleSubmitData = async(data) => {

        const {email, password} = data;
      const {data: user , error} = await authClient.signIn.email({
        email: email,
        password: password,
        callbackURL: "/"
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
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login your account
        </h1>
        
        <hr className="mb-10 border-gray-100" />

       <Form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit(handleSubmitData)}>
            <TextField
                isRequired
                type="email"
                validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                }
                return null;
                }}
            >
                <Label>Email</Label>
                <Input type='email' {...register("email")} placeholder="Enter your email" />
                <FieldError />
            </TextField>

            <TextField className="w-full" name="password">
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                        className="w-full ]"
                        type={isVisible ? "text" : "password"}
                        {...register("password")}
                        placeholder='Enter your password'
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
                    <Description className="text-xs text-gray-500 mt-1">
                            Min 8 chars, 1 uppercase, 1 number
                        </Description>
              </TextField>

            <div className="flex gap-2">
                <Button type="submit" className="w-full bg-stone-800" >
                <Check />
                Login
                </Button>
            </div>
            </Form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Don't Have An Account ?
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