"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLink = ({ href, children, className }) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
        <div>
            <Link href={href} className={`${isActive ? 'text-blue-600' : "" } ${className}`}>
                {children}
            </Link>
        </div>
    );
};

export default NavLink;