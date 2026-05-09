"use client";
import { Check, Eye, EyeSlash } from '@gravity-ui/icons';
import { Button, Description, FieldError, Form, Input, InputGroup, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authClient } from '../../../lib/auth-client';

const RegisterPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {register, handleSubmit} = useForm();
    const handleSubmitRegister = async (data) => {
        // console.log(data);

        const {name, email, password, Photo} = data;
        const {data: user , error} = await authClient.signUp.email({
            name: name, 
            email: email,
            password: password,
            image: Photo,
            callbackURL: "/"
        });
        if (error) {
             alert("Signup Error: " + error.message);
        } else {
            alert("Signup Successfully create your account");
        }

        // console.log(error);
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Register your account
        </h1>
        
        <hr className="mb-10 border-gray-100" />

       <Form className="flex w-96 flex-col gap-4" onSubmit={handleSubmit(handleSubmitRegister)}>

            <TextField
                isRequired
                name="name"
                type="text"
                validate={(value) => {
                if (value.length < 2) {
                    return "Name must be at least 2 characters";
                }
                return null;
                }}
            >
                <Label>Name</Label>
                <Input {...register("name")} placeholder="Enter your name" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                name="Photo"
                type="text"
            >
                <Label>Photo</Label>
                <Input {...register("Photo")} placeholder="Upload your photo" />
                <FieldError />
            </TextField>

            <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                }
                return null;
                }}
            >
                <Label>Email</Label>
                <Input {...register("email")} placeholder="Enter your email" />
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
                Register
                </Button>
            </div>
            </Form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Already Have An Account ?
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