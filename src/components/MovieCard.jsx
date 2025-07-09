import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import { FaStar,FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } =
    useContext(MovieContext);

  const isFavorited = favorites.some((m) => m.id === movie.id);
  const isWatchlisted = watchlist.some((m) => m.id === movie.id);

  const handleClick = () => {
    navigate(`/MovieDetails/${movie.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/fallback.jpg"
        }
        alt={movie.title || movie.name}
        className="w-full h-96 object-cover object-center"
      />
       {movie.vote_average > 0 && (
        <div className="absolute top-2 left-2 bg-yellow-500 text-black text-sm px-2 py-1 rounded font-bold flex items-center gap-1">
          <FaStar className="text-black" />
          {movie.vote_average.toFixed(1)}
        </div>
      )}
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">
          {movie.title || movie.name}
        </h3>
        {movie.release_date && (
          <p className="text-gray-400 text-sm mt-1">
            Release: {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>

      {/* Favorite & Watchlist Icons */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent parent click
        className="absolute top-2 right-2 flex gap-3"
      >
        <button onClick={() => toggleFavorite(movie)} title="Favorite">
          {isFavorited ? (
            <FaHeart className="text-red-500 cursor-pointer" />
          ) : (
            <FaRegHeart className="text-white  cursor-pointer hover:text-red-400" />
          )}
        </button>
        <button onClick={() => toggleWatchlist(movie)} title="Watchlist">
          {isWatchlisted ? (
            <FaBookmark className="text-yellow-400 cursor-pointer" />
          ) : (
            <FaRegBookmark className="text-white  cursor-pointer hover:text-yellow-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;