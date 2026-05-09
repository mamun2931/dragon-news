"use client";
import React from 'react';
import userAvatar from "@/assets/user.png";
import Image from 'next/image';
import NavLink from './NavLink';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

const NavBar = () => {
    const {data: session , isPending} = authClient.useSession(); 
    const user = session?.user;

    return (
        <div className="flex items-center justify-between py-4 px-2 container mx-auto">
            <div></div >
            <ul className="flex gap-6">
                <li><NavLink href="/">Home</NavLink></li>
                <li><NavLink href="/about">About-us</NavLink></li>
                <li><NavLink className={"text-amber-300"} href="/career">Career</NavLink></li>
            </ul>
    {    
    isPending ? (<div>Loading...</div>) :  user ?       

           ( <div className="flex items-center gap-2 px-1">
                <h2>{user?.name}</h2>
                <Image src={user?.image || userAvatar}   alt="user profile" width={32}
                            height={32}
                            className="rounded-full object-cover" 
                            />
                <button 
                onClick={async() => await authClient.signOut()}
                className="btn bg-purple-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"> 
                    LogOut
                </button>
            </div>)
            : (
                <button className="btn bg-purple-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"> <Link href="/login">Login</Link></button>
            )
            }
        </div>
    );
};

export default NavBar;