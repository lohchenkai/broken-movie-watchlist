import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { IconContext } from "react-icons";
import { MdAddCircle } from "react-icons/md";
import Nav from "../components/Nav"
import MovieCard from "../components/MovieCard"
import "../style/Watchlist.css";

export default function Watchlist() {
  let navigate = useNavigate();
  // track local storage
  const [movieArray, setMovieArray] = useState(() => JSON.parse(localStorage.getItem("movieArray")));
  console.log(movieArray);
  
  // function to delete movie from list
  function removeMovie(id){
    setMovieArray(prev => prev.filter(movie => movie.imdbID !== id));
    localStorage.setItem("movieArray", JSON.stringify(movieArray));
    console.log(movieArray)
  }
  
  // getting movie elements
  const movieElement = movieArray ? (movieArray.map( movie => {
    return <MovieCard {...movie} key={movie.imdbID} id={movie.imdbID} removeMovie={removeMovie} toAdd={false} />
  }))
  : "";

  return (
    <div className="component-container">
      <Nav 
        heading="My Watchlist"
        subheading="Search for movies"
        path="/"
        searchbar={false}
      />
      <main className="main-container">
        {movieArray ? movieElement
          :
          <div className="empty">
            <h2 className="empty-title">Your watchlist is looking a little empty...</h2>
            
            <div className="empty-section">
              <IconContext.Provider value={{className: "empty-icon"}}>
                <MdAddCircle />
              </IconContext.Provider>
              <a className="empty-link" onClick={() => navigate("/")} >Let's add some movies!</a>
            </div>
          </div>
          }
      </main>
    </div>
  )
}
