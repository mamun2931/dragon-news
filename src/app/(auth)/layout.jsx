import NavBar from '@/components/shared/NavBar';
import React from 'react';
import { montserrat } from '../layout';

const AuthLayout = ( {children} ) => {
    return (
        <div className={`${montserrat.className}`}>
            <NavBar />
            {children}
        </div>
    );
};

export default AuthLayout;