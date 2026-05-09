import Link from 'next/link';
import React from 'react';

const LeftSideBar = ({ newsCategories, activeId}) => {
    return (
        <div>
          <h1 className="text-lg font-bold"> All Categories</h1>
          <ul className="flex flex-col gap-2 mt-6">
             {newsCategories.map(category => <li className={`${activeId === category.category_id && "bg-purple-600 text-white"} rounded-md font-bold text-md text-center`} key={category.category_id}>
 
                <Link className='block p-2 ' href={`/category/${category.category_id}`}>{category.category_name}</Link>

             </li>)
            }
          </ul>
        </div>
    );
};

export default LeftSideBar;