
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import MovieContext from "../context/MovieContext";
 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
 
const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
 
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } =
    useContext(MovieContext);
 
  const isFavorited = favorites.some((m) => m.id === parseInt(id));
  const isWatchlisted = watchlist.some((m) => m.id === parseInt(id));
 
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };
 
    const fetchTrailer = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        );
        const data = await res.json();
        console.log("All videos:", data.results);
        const trailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };
 
    fetchDetails();
    fetchTrailer();
  }, [id]);
 
 
  if (!movie)
    return (
      <div className="text-white mt-10 text-center bg-[#1d0f0f] h-screen py-40">
        Loading...
      </div>
    );
 
  return (
    <div className="bg-[#1d0f0f] text-white min-h-screen p-8">
      <div className="md:flex items-center gap-12">
        <div className="flex justify-center mb-6 relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-lg shadow-xl w-[300px]"
          />
 
          <div className="absolute top-2 right-2 flex gap-3">
            <button onClick={() => toggleFavorite(movie)} title="Favorite">
              {isFavorited ? (
                <FaHeart className="text-red-500 cursor-pointer" />
              ) : (
                <FaRegHeart className="text-white cursor-pointer hover:text-red-400" />
              )}
            </button>
            <button onClick={() => toggleWatchlist(movie)} title="Watchlist">
              {isWatchlisted ? (
                <FaBookmark className="text-yellow-400 cursor-pointer" />
              ) : (
                <FaRegBookmark className="text-white cursor-pointer hover:text-yellow-400" />
              )}
            </button>
          </div>
        </div>
 
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <p className="text-gray-300 mb-4">Popularity: {movie.popularity}</p>
          <p className="text-gray-300 mb-4">Total Votes: {movie.vote_count}</p>
          <p className="text-sm text-gray-400 flex justify-center md:justify-start items-center gap-2">
            Release: {movie.release_date} | Rating: {movie.vote_average}
            <FaStar className="w-5 h-5 text-yellow-400" />
          </p>
        </div>
      </div>
 
      {/* 🎬 Trailer Section */}
      {trailerKey && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4 text-center">Watch Trailer</h2>
          <div className="flex justify-center">
            <iframe
              width="100%"
              height="480"
              className="max-w-3xl rounded-xl shadow-lg"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default MovieDetails;
 
 