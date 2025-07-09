import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

const ShowCard = ({ show }) => {
  const navigate = useNavigate();
  const { favorites, watchlist, toggleFavorite, toggleWatchlist } =
    useContext(MovieContext);

  const isFavorited = favorites.some((m) => m.id === show.id);
  const isWatchlisted = watchlist.some((m) => m.id === show.id);

  const handleClick = () => {
    navigate(`/tvshow/${show.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
    >
      <img
        src={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : "/fallback.jpg"
        }
        alt={show.name}
        className="w-full h-96 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">
          {show.name}
        </h3>
        {show.first_air_date && (
          <p className="text-gray-400 text-sm mt-1">
            First Aired: {new Date(show.first_air_date).getFullYear()}
          </p>
        )}
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 flex gap-3"
      >
        <button onClick={() => toggleFavorite(show)} title="Favorite">
          {isFavorited ? (
            <FaHeart className="text-red-500 cursor-pointer" />
          ) : (
            <FaRegHeart className="text-white cursor-pointer hover:text-red-400" />
          )}
        </button>
        <button onClick={() => toggleWatchlist(show)} title="Watchlist">
          {isWatchlisted ? (
            <FaBookmark className="text-yellow-400 cursor-pointer" />
          ) : (
            <FaRegBookmark className="text-white cursor-pointer hover:text-yellow-400" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ShowCard;