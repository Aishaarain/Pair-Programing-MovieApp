import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import MovieContext from "../context/MovieContext";



const ShowDetails = ({darkMode}) => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const {
    favorites,
    watchlist,
    toggleFavorite,
    toggleWatchlist,
    API_KEY
  } = useContext(MovieContext);

  const isFavorited = favorites.some((item) => item.id === parseInt(id));
  const isWatchlisted = watchlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setShow(data))
      .catch((err) => console.error("Error fetching show:", err));
  }, [id]);

  if (!show)
    return <div className="text-white mt-10 text-center">Loading...</div>;

  return (
    <div className={`${darkMode? "bg-[#f2ecec]  text-[#1b0b0b]":"text-white"}bg-[#1d0f0f]  min-h-screen p-8 md:flex items-center`}>
      <div className="flex justify-center mb-6 relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          className="rounded-lg shadow-xl w-[300px]"
        />
        <div className="absolute top-2 right-2 flex gap-3">
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

      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">{show.name}</h1>
        <p className="text-gray-300 mb-4">{show.overview}</p>
        <p className="text-gray-300 mb-4">Popularity: {show.popularity}</p>
        <p className="text-gray-300 mb-4">Total Votes: {show.vote_count}</p>
        <p className="text-sm text-gray-400 flex flex-row justify-center items-center gap-2">
          First Air Date: {show.first_air_date} | Rating: {show.vote_average}
          <FaStar className="w-5 h-5 text-yellow-400" />
        </p>
      </div>
    </div>
  );
};

export default ShowDetails;