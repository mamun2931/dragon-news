import React from 'react';
import Marquee from 'react-fast-marquee';

const BreakingNews = () => {
    const News = [
  {
    id: 1,
    title: "Heavy Rainfall Expected in Dhaka",
  },
  {
    id: 2,
    title: "New AI Technology Released",
  },
  {
    id: 3,
    title: "Bangladesh Wins Cricket Series",
  },
];
    return (
        <div className="flex items-center justify-start gap-4 bg-gray-200 py-2 px-2 container mx-auto">
            <button className="btn bg-red-400 text-white">Latest</button>
            <Marquee pauseOnHover={true} gradient={false} speed={50}>
                {News.map((news) => (<span key={news.id}>{news.title}</span>
                ))}
             </Marquee>
        </div>
    );
};

export default BreakingNews;