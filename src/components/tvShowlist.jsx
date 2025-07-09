import React, { useState, useEffect } from 'react';

import ShowCard from './showCard';
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; 

const TVShowList = ({ shows = [] }) => {
  const [trendingShows, setTrendingShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTVShows = async () => {
      setLoading(true);
      setError(null);

      try {
        // Trending
        const trendingRes = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${TMDB_API_KEY}`
        );
        if (!trendingRes.ok) throw new Error(`Trending failed: ${trendingRes.status}`);
        const trendingData = await trendingRes.json();
        setTrendingShows(trendingData.results);

        // Popular
        const popularRes = await fetch(
          `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`
        );
        if (!popularRes.ok) throw new Error(`Popular failed: ${popularRes.status}`);
        const popularData = await popularRes.json();
        setPopularShows(popularData.results);

        // Top Rated
        const topRatedRes = await fetch(
          `https://api.themoviedb.org/3/tv/top_rated?api_key=${TMDB_API_KEY}`
        );
        if (!topRatedRes.ok) throw new Error(`Top Rated failed: ${topRatedRes.status}`);
        const topRatedData = await topRatedRes.json();
        setTopRatedShows(topRatedData.results);

      } catch (err) {
        console.error("Error fetching TV shows:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1d0f0f] flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">Loading TV shows...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1d0f0f] flex flex-col items-center justify-center p-8">
        <p className="text-red-500 text-xl font-bold mb-4">Something went wrong!</p>
        <p className="text-gray-400 mt-4">Please check your internet connection.</p>
      </div>
    );
  }

  if (shows.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {shows.map((tv) => (
          <ShowCard key={tv.id} show={tv} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-4xl font-bold  mb-8 text-center md:text-left">Trending TV Shows</h2>
      {trendingShows.length === 0 ? (
        <p className="text-gray-400 text-center text-lg mb-12">No trending shows found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-16">
          {trendingShows.map((tv) => (
            <ShowCard key={tv.id} show={tv} />
          ))}
        </div>
      )}

      <h2 className="text-4xl font-bold  mb-8 text-center md:text-left">Popular TV Shows</h2>
      {popularShows.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No popular shows found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {popularShows.map((tv) => (
           <ShowCard key={tv.id} show={tv} />
          ))}
        </div>
      )}

      <h2 className="text-4xl font-bold  mb-8 text-center md:text-left">Top Rated TV Shows</h2>
      {topRatedShows.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No top-rated shows found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {topRatedShows.map((tv) => (
          <ShowCard key={tv.id} show={tv} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TVShowList;