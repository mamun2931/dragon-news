import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NewsCard = ({ news }) => {
    // FIX #1: Guard against missing news object entirely
    if (!news) return null;

    // FIX #1: Safely destructure with fallbacks
    const {
        _id,
        title = 'Untitled',
        image_url,
        details = '',
        total_view = 0,
        author = {},
        rating = {},
    } = news;

    const { img: authorImg, name: authorName = 'Unknown', published_date = '' } = author;
    const ratingNumber = rating.number ?? 0;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="p-4">

                {/* Author Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* FIX #5: Removed redundant wrapper div styles; Image handles the circle */}
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
                            {authorImg ? (
                                <Image
                                    src={authorImg}
                                    alt={authorName}
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                    // FIX #6: lazy load author avatar
                                    loading="lazy"
                                />
                            ) : (
                                <span className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-600">
                                    {authorName.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 leading-none mb-0.5">{authorName}</p>
                            <p className="text-xs text-gray-400">{published_date}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-400">
                        {/* Bookmark */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {/* Share */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 cursor-pointer hover:text-gray-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-[15px] font-bold text-gray-900 leading-snug mb-3">
                    {title}
                </h2>

                {/* Hero Image */}
                <div className="rounded-xl overflow-hidden mb-3 bg-gray-100 h-48 flex items-center justify-center">
                    {image_url ? (
                        <Image
                            src={image_url}
                            alt={title}
                            width={400}
                            height={300}
                            className="object-cover w-full h-full"
                            // FIX #6: lazy load hero image
                            loading="lazy"
                        />
                    ) : (
                        <span className="text-gray-400 text-sm">No image available</span>
                    )}
                </div>

                {/* FIX #4: Clamp details text to 3 lines for consistent card height */}
                <p className="text-xs text-gray-500 leading-relaxed mb-1 line-clamp-3">
                    {details}
                </p>

                {/* FIX #2: Removed nested <button> inside <Link>; Link is styled directly */}
                {_id && (
                    <Link
                        href={`/news/${_id}`}
                        className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                    >
                        Read More
                    </Link>
                )}

                {/* Divider */}
                <hr className="my-3 border-gray-100" />

                {/* Footer */}
                <div className="flex items-center justify-between">
                    {/* FIX #3: Stars rendered dynamically based on rating.number */}
                    <div className="flex items-center gap-1">
                        <div className="flex text-base">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <span
                                    key={i}
                                    className={i <= Math.round(ratingNumber) ? 'text-orange-400' : 'text-gray-200'}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-800 ml-1">{ratingNumber}</span>
                    </div>

                    {/* Views */}
                    <div className="flex items-center gap-1.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-sm text-gray-500">{total_view}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewsCard;