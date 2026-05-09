import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-purple-600 text-4xl gap-2">
            
                <h1>404 - Page Not Found</h1>
               <p>The page you are looking for does not exist.</p>
            
            <div>
                <Link href="/" >
                   <button className='btn bg-purple-600'>Go back to the home page</button>
                </Link>
            </div>

        </div>
    );
};

export default NotFound;