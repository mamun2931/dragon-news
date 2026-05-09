import BreakingNews from '@/components/shared/BreakingNews';
import Header from '@/components/shared/Header';
import NavBar from '@/components/shared/NavBar';
import React from 'react';

const mainLayout = ({children}) => {
    return (
        <div>
            <Header />
            <BreakingNews />
            <NavBar />
            {children}
        </div>
    );
};

export default mainLayout;