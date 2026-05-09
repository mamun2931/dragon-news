"use client";
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

const RightSideBar = () => {
    const handleGoogleSignIn = async() => {
          const data = await authClient.signIn.social({
                provider: "google",
            }); 
        }
    const handleGithubSignIn = async() => {
          const data = await authClient.signIn.social({
                provider: "github",
            });
            console.log(data);
    }
    return (
        <div>
            <h2 className='text-lg font-bold'>Login with</h2>

            <div className='flex flex-col gap-2 mt-2'>
                <button onClick={handleGoogleSignIn} className='btn border-blue-500 text-blue-500'> <FaGoogle /> Login with Google</button>
                <button onClick={handleGithubSignIn} className='btn'> <FaGithub /> Login with GitHub</button>
            </div>
        </div>
    );
};

export default RightSideBar;