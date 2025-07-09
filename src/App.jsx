import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieContextProvider from './context/MovieContextProvider';
import TVShowList from "./components/tvShowlist.jsx";
import ShowDetails from "./pages/ShowDetails.jsx";
import PeopleList from "./components/peopleList.jsx";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import YearFilter from "./components/YearFilter";
import NotFound from "./pages/NotFound";
import MyList from "./pages/Mylist.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";


function App() {
 const [darkMode, setDarkMode] = useState(false);
 const toggleDarkMode = () => setDarkMode((prev) => !prev); 
 


  return (
   <MovieContextProvider>
      <BrowserRouter>
        <div  className={`md:pt-20 pt-10 px-4 bg-[#1d0f0f]  ${darkMode? "bg-[#f2ecec] text-[#1b0b0b]" : "bg-[#1d0f0f] text-[#f2ecec] "}  `}>
          <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          
          <Routes>
           
            <Route path="/" element={<><Home /></>} />
              <Route path="/MovieDetails/:id" element={<><MovieDetails darkMode={darkMode} /></>} />
            <Route path="/search/:name" element={<><SearchBar darkMode={darkMode} /></>} />
            <Route path="/search/genre" element={<><GenreFilter darkMode={darkMode} /></>} />
            <Route path="/search/year" element={<><YearFilter darkMode={darkMode} /></>} />
<Route path="/tvshow" element={<><TVShowList darkMode={darkMode} /></>} />
            <Route path="/tvshow/:id" element={<><ShowDetails darkMode={darkMode}/></>} />
            <Route path="/person/popular" element={<><PeopleList darkMode={darkMode}/></>} />
            <Route path="Mylist" element={<><MyList darkMode={darkMode}/></>} />
           
            <Route path="*" element={<NotFound darkMode={darkMode} />} />
          </Routes>
        </div>
      </BrowserRouter>
   </MovieContextProvider>
  );
}

export default App;
