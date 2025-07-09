import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "../components/MovieList copy";


const Home = ({searchResults}) => {
  return (
    <div >
  <MovieList movies={searchResults}/>
  </div>
    
  )
}

export default Home
