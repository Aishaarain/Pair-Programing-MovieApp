import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';


const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; 


const TMDB_BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;


const MovieList = ({movies=[]}) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies,settopRatedMovies]= useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true); 
      setError(null); 

      try {
        
        const trendingResponse = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}`
        );
        
        if (!trendingResponse.ok) {
          
          throw new Error(`Failed to fetch trending: HTTP status ${trendingResponse.status}`);
        }
        const trendingData = await trendingResponse.json();
       
        setTrendingMovies(trendingData.results); 

        
        const popularResponse = await fetch(
          `${TMDB_BASE_URL}`
        );
        if (!popularResponse.ok) {
          throw new Error(`Failed to fetch popular: HTTP status ${popularResponse.status}`);
        }
        const popularData = await popularResponse.json();
        
        setPopularMovies(popularData.results); 


        const topResponse = await fetch(
          ` https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}`
        );
        if (!topResponse.ok) {
          throw new Error(`Failed to fetch popular: HTTP status ${topResponse.status}`);
        }
        const topRatedData = await topResponse.json();
       
        settopRatedMovies(topRatedData.results); 
       
      } catch (err) {
        
        console.error("Error fetching movies:", err);
        setError(err.message);
      } finally {
      
        setLoading(false);
      }
    };

    fetchMovies();
   
  }, []);



  if (loading) {
    return (
      <div className="min-h-screen bg-[#1d0f0f] flex items-center justify-center">
        <p className="text-white text-2xl animate-pulse">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1d0f0f] flex flex-col items-center justify-center p-8">
        <p className="text-red-500 text-xl font-bold mb-4">Something Wrong!</p>
        {/* <p className="text-red-300 text-lg text-center">{error}</p> */}
        <p className="text-gray-400 mt-4">Please check your internet connection.</p>
      </div>
    );
  }

if(movies.length >0){
  return(
         <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        )
}
  return (
   

    <div className="min-h-screen  p-8">
     
      <h2 className="text-4xl font-bold text-white mb-8 text-center md:text-left">
        Trending This Week
      </h2>
      {trendingMovies.length === 0 ? (
        <p className="text-gray-400 text-center text-lg mb-12">No trending movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-16">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

     
      <h2 className="text-4xl font-bold text-white mb-8 text-center md:text-left">
        Popular Movies
      </h2>
      {popularMovies.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No popular movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      
       <h2 className="text-4xl font-bold text-white mb-8 text-center md:text-left">
        Top Rated Movies
      </h2>
      {topRatedMovies.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No Latest Movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {topRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )} 
    </div> 
  );
};

export default MovieList;