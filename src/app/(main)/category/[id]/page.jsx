import React from 'react';
import LeftSideBar from "@/components/HomePage/news/LeftSideBar";
import RightSideBar from "@/components/HomePage/news/RightSideBar";
import { categories, categoriesNews } from '@/lib/data';
import NewsCard from '@/components/HomePage/news/NewsCard';

const categoryPage = async({params}) => {
         const { id } = await params;
          const newsCategories = await categories();
         const getNews = await categoriesNews(id);
    return (
        <div className="container mx-auto grid grid-cols-12 gap-4">
           <div className="col-span-3">
              <LeftSideBar newsCategories={newsCategories} activeId={id}/>
           </div>
            <div className="col-span-6 ">
              <div>
                 <h2 className="text-lg font-bold">Dragon News Home</h2>
                 <div className="p-4 rounded-md space-y-4 mt-6">
                     {
                  getNews.length > 0 ? 
                     getNews.map(news => <NewsCard key={news._id} news={news} />)
                    
                  : 
                   <div className="p-4 rounded-md bg-amber-400 text-center">No news found for this category.</div>
                  
                }
                 </div>
              </div>
            </div>
    
            <div className="col-span-3">
              <RightSideBar />
            </div>
        
         </div>
        
        );
};

export default categoryPage;