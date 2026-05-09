import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png';
import { format } from 'date-fns';


const Header = () => {
    return (
        <div className='text-center py-5 space-y-2'>
            <Image src={logo} alt="Logo" width={300} height={300} className='mx-auto'/>
            <p>Journalism Without Fear or Favour</p>
           <p>{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        </div>
    );
};

export default Header;