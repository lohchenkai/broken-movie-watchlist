import { useState } from "react";import {useNavigate} from "react-router-dom";
import { IconContext } from "react-icons";
import { MdLocalMovies } from "react-icons/md";
import MovieCard from "../components/MovieCard";
import Nav from "../components/Nav";
import "../style/FindFilm.css";

export default function FindFilm() {
  //state to store form value
  const [searchValue, setSearchValue] = useState("");

  //state to store returned movie info
  const [movieInfo, setMovieInfo] = useState()

  //function to handle form change
  function handleChange(event){
    setSearchValue(event.target.value)
  }

  //function to save movie to local storage
  function addMovie(id){
    let storageArray = JSON.parse(localStorage.getItem("movieArray"));
    const newMovieArray = [];
    
    if(storageArray === null || storageArray.length === 0){
      // if local storage (w/ key named movieArray is empty)
      newMovieArray.push(movieInfo)
      localStorage.setItem("movieArray", JSON.stringify(newMovieArray))
    }
    else {
      let toAdd = true;
      storageArray.forEach(show => newMovieArray.push(show));

      for(let show of newMovieArray){
        show.Title === movieInfo.Title ? toAdd = false : "";
      }

      toAdd ? newMovieArray.push(movieInfo) : "";
      localStorage.setItem("movieArray", JSON.stringify(newMovieArray))
      console.log(newMovieArray);
    }
  }

  // function to handle form submit
  function handleSubmit(event){
    event.preventDefault();
    setMovieInfo("");

    fetch(`http://www.omdbapi.com/?apikey=e8c5dc6&t=${searchValue}`)
      .then(response => response.json())
      .then(data => setMovieInfo(data))
  }

  return (
    <div className="component-container">
        <Nav 
          heading="Find your film"
          subheading="My Watchlist"
          path="/watchlist"
          inputValue={searchValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          searchbar={true}
        />
        <main className="main-container">
          {movieInfo ? <MovieCard {...movieInfo} addMovie={addMovie} id={movieInfo.imdbID} toAdd={true} /> 
            : 
            <div className="start">
              <IconContext.Provider value={{className: "start-icon"}}>
                <MdLocalMovies />
              </IconContext.Provider>
              <h3 className="start-text">Start exploring</h3>
            </div>
          }
        </main>
    </div>
  )
}

