// 
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import MovieContext from "../context/MovieContext"; // adjust path as needed

import {
  FaBookmark,
  FaBars,
  FaTimes,
  FaSearch,
  FaMoon,
  FaSun,
} from "react-icons/fa";


export default function Navbar({toggleDarkMode,darkMode}) {
  const [isOpen, setIsOpen] = useState(false);

  const [showOverlay, setShowOverlay] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const closeSidebar = () => setIsOpen(false);
  
  const handleSearchClick = () => setShowOverlay((prev) => !prev);

  const handleSearchKey = (e) => {
    if (e.key === "Enter") {
      const trimmed = searchValue.trim();
      if (trimmed) {
        navigate(`/search/${encodeURIComponent(trimmed)}`);
        setShowOverlay(false);
        setSearchValue("");
      }
    }
  };

  return (
    <>
      <nav
        className={` ${darkMode? "text-[#1b0b0b] bg-[#f2ecec]": "text-white bg-[#1d0f0f]"} fixed top-0 left-0 w-full z-50 shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 ">
              <img className="fill-[#1d0f0f]" src="/cinescope.svg" alt="" />
             <Link to='/'> <span className="text-lg font-bold">CineScope</span></Link>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-6 text-sm">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/tvshow" className="hover:text-gray-300">Tv Shows</Link>
               <Link to="/" className="hover:text-gray-300">Movies</Link>
              <Link to="/person/popular" className="hover:text-gray-300">People</Link>
            </div>

            {/* Right Controls */}
            <div className={`flex flex-row items-center space-x-4 ` }>
              {/* Search Input */}
              <div className="relative z-10">
                <div className="p-4  z-20 flex flex-row">
                  <input
                    value={searchValue}
                    onClick={handleSearchClick}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSearchKey}
                    type="text"
                    placeholder="Search"
                    className="bg-[#441f1f] text-white max-sm:hidden max-sm:w-20 w-30 text-sm rounded-md pl-8 pr-4 py-1 placeholder-gray-400 focus:outline-none focus:ring-2 max-sm:ml-2  md:focus:w-60 focus:ring-red-500 uppercase"
                  /> 
                  <span className="absolute cursor-pointer left-6 max-sm:left-2 top-5 text-sm text-gray-400 max-sm:top-3 max-sm:text-yellow-700">
                    <FaSearch  onClick={handleSearchClick} className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="text-xl hover:text-yellow-400 "
                title="Toggle Dark Mode"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              {/* Bookmark */}
              <Link to="/mylist">
                <FaBookmark className={` text-xl cursor-pointer  max-sm:mr-3 ${darkMode? "text-[#1b0b0b]": "text-white"}`} />
              </Link>

              {/* Avatar */}
              <img
                src="/profile.jpg"
                alt="profile"
                className="w-8 h-8 max-sm:hidden rounded-full object-cover"
              />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden max-sm:mr-3">
              <button onClick={() => setIsOpen(true)} className="text-2xl">
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <hr className="h-0.5 max-md:mt-4 bg-gray-500 border-none" />

      {/* Search Overlay */}
      {showOverlay && (
        <div className="inset-0  flex-row flex justify-center items-start pt-0 transition-all duration-300">
          <div className="p-4 z-20 flex flex-row">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleSearchKey}
              type="text"
              placeholder="Search"
              className="bg-[#441f1f] text-white max-md:w-[500px] max-sm:w-[200px] w-[800px] text-sm rounded-md pl-8 pr-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="absolute ml-2 mt-4 text-sm text-gray-400">
              <FaSearch className="w-4 h-4" />
            </span>
          </div>
        </div>
      )}

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full text-white bg-[#1d0f0f] z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <button onClick={closeSidebar} className="text-2xl">
            <FaTimes />
          </button>
          <div >
           <img
            src="/profile.jpg"
            alt="profile"
            className="w-8 h-8 rounded-full object-cover"
          /></div>
        </div>

        <div className="flex flex-col space-y-4 p-4 text-sm justify-between">
          
          <Link to="/" className="hover:text-gray-300" onClick={closeSidebar}>
            Home
          </Link>
           <Link to="/Movies" className="hover:text-gray-300" onClick={closeSidebar}>
            Movies
          </Link>
          <Link to="/tvshow" className="hover:text-gray-300" onClick={closeSidebar}>
            TV Shows
          </Link>
          
          <Link to="/person/popular" className="hover:text-gray-300" onClick={closeSidebar}>
            People
          </Link>
         
        </div>
      </div>
    </>
  );
}
