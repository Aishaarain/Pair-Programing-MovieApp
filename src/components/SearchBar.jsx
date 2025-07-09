import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SearchBar = ({darkMode}) => {
  const { name } = useParams(); // 👈 get the :name param
  const [movies, setMovies] = useState([]);
  const [loading,setLoading]=useState(null);
  const [error,setError]=useState(null);
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            name
          )}&api_key=${TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      } 
    };

    fetchSearchResults();
  }, [name]);

  return (
    <>
      <div className= {`${darkMode? "bg-[#f2ecec] text-[#1b0b0b]" : "bg-[#1b0b0b] text-white"}bg-[#1d0f0f] min-h-screen  px-4 py-6 `}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="w-full md:w-1/6">
            <h2 className="text-lg font-semibold mb-4 ">Filters</h2>
            <div className="mb-4">
              <Link
                to="/search/genre"
                className="py-6 cursor-pointer px-18 bg-[#441f1f] rounded-lg border-2 border-[#663336] relative w-50 hover:bg-[#6b3c3c]  transition-all duration-300 ease-in-out block"
              >
                <p className="absolute top-0 left-0 text-white">Genre</p>
                <svg
                  className="absolute bottom-0 right-[25%] "
                  width="106"
                  height="20"
                  viewBox="0 0 126 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M123.367 164.633C125.057 166.321 126.007 168.611 126.007 171C126.007 173.389 125.057 175.679 123.367 177.367L69.3675 231.367C67.6794 233.057 65.3887 234.007 63 234.007C60.6113 234.007 58.3206 233.057 56.6325 231.367L2.6325 177.367C-0.884171 173.851 -0.884171 168.149 2.6325 164.633C6.14917 161.116 11.8508 161.116 15.3675 164.633L63 212.276L110.633 164.633C112.321 162.943 114.611 161.993 117 161.993C119.389 161.993 121.679 162.943 123.367 164.633ZM15.3675 69.3675L63 21.7238L110.633 69.3675C114.149 72.8842 119.851 72.8842 123.367 69.3675C126.884 65.8508 126.884 60.1492 123.367 56.6325L69.3675 2.6325C67.6794 0.942507 65.3887 -0.00708008 63 -0.00708008C60.6113 -0.00708008 58.3206 0.942507 56.6325 2.6325L2.6325 56.6325C-0.884171 60.1492 -0.884171 65.8508 2.6325 69.3675C6.14917 72.8842 11.8508 72.8842 15.3675 69.3675Z"
                    fill="#C79194"
                  />
                </svg>
              </Link>
            </div>
            <div>
              <Link
                to="/search/year"
                className=" cursor-pointer py-6 px-18 bg-[#441f1f] rounded-lg border-2 border-[#663336] hover:bg-[#6b3c3c]  relative w-50  transition-all duration-300 ease-in-out block"
              >
                <p className="absolute top-0 left-0 text-white">Year</p>
                <svg
                  className="absolute bottom-0 right-[25%] "
                  width="106"
                  height="20"
                  viewBox="0 0 126 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M123.367 164.633C125.057 166.321 126.007 168.611 126.007 171C126.007 173.389 125.057 175.679 123.367 177.367L69.3675 231.367C67.6794 233.057 65.3887 234.007 63 234.007C60.6113 234.007 58.3206 233.057 56.6325 231.367L2.6325 177.367C-0.884171 173.851 -0.884171 168.149 2.6325 164.633C6.14917 161.116 11.8508 161.116 15.3675 164.633L63 212.276L110.633 164.633C112.321 162.943 114.611 161.993 117 161.993C119.389 161.993 121.679 162.943 123.367 164.633ZM15.3675 69.3675L63 21.7238L110.633 69.3675C114.149 72.8842 119.851 72.8842 123.367 69.3675C126.884 65.8508 126.884 60.1492 123.367 56.6325L69.3675 2.6325C67.6794 0.942507 65.3887 -0.00708008 63 -0.00708008C60.6113 -0.00708008 58.3206 0.942507 56.6325 2.6325L2.6325 56.6325C-0.884171 60.1492 -0.884171 65.8508 2.6325 69.3675C6.14917 72.8842 11.8508 72.8842 15.3675 69.3675Z"
                    fill="#C79194"
                  />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">
              Search results for "{name}"
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;