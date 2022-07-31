import { useState, useEffect } from "react";import {useNavigate} from "react-router-dom";
import { IconContext } from "react-icons";
import { MdLocalMovies } from "react-icons/md";
import MovieCard from "../components/MovieCard";
import Nav from "../components/Nav";
import "../style/FindFilm.css";

export default function FindFilm() {
  // state to store form value
  const [searchValue, setSearchValue] = useState("");
  // state to store a list of movies
  const [movieList, setMovieList] = useState([])
  // state to track movieList and get detailed info for each movie stored
  const [detailedMovieList, setDetailedMovieList] = useState([])
  console.log(detailedMovieList)
  // state to track movie search results
  const [isFound, setIsFound] = useState(true)
  
  // inititate another api call to get detailed info for each movie in movieList
  useEffect(() => {
    setDetailedMovieList([]);
    movieList && movieList.map(movie => {
      fetch(`http://www.omdbapi.com/?apikey=e8c5dc6&i=${movie.imdbID}`)
      .then(response => response.json())
      .then(data => setDetailedMovieList(prev => [...prev, data]))
    })
  }, [movieList])
  
  // function to handle form submit
  function handleSubmit(event){
    event.preventDefault();

    fetch(`http://www.omdbapi.com/?apikey=e8c5dc6&s=${searchValue}`)
      .then(response => response.json())
      .then(data => {
        if(data.Response === "True"){
          setIsFound(true)
          setMovieList(data.Search)
        }
        else{
          setIsFound(false);
        }
      })
  }

  //function to handle form change
  function handleChange(event){
    setSearchValue(event.target.value)
  }

  //function to save movie to local storage
  function addMovie(id){
    let storageArray = JSON.parse(localStorage.getItem("movieArray")) || [];
    
    if(storageArray === null || storageArray.length === 0){
      detailedMovieList.forEach(movie => {
        if(movie.imdbID === id){
          storageArray.push(movie)
        }
      })
      localStorage.setItem("movieArray", JSON.stringify(storageArray));
      console.log(storageArray);
    }
    else{
      let exist = false;
      storageArray.forEach(movie => {
        if(movie.imdbID === id){
          exist = true;
        }
      })

      !exist && detailedMovieList.forEach(movie => {
        if(movie.imdbID === id){
          storageArray.push(movie);
          localStorage.setItem("movieArray", JSON.stringify(storageArray));
        }
      })
      console.log(storageArray);
    }
  }

  const movieElement = detailedMovieList.map( movie => {
    return <MovieCard key={movie.imdbID} {...movie} addMovie={addMovie} id={movie.imdbID} toAdd={true} /> 
  })

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
          {isFound ? detailedMovieList.length > 0 ? movieElement
            : 
            <div className="start">
              <IconContext.Provider value={{className: "start-icon"}}>
                <MdLocalMovies />
              </IconContext.Provider>
              <h3 className="start-text">Start exploring</h3>
            </div>
            :
            <div className="search-error">
              <h2>Unable to find what you're looking for. Please try another search.</h2>
            </div>
          }
        </main>
    </div>
  )
}



    // <div className="search-error">
    //     <h2>Unable to find what you're looking for. Please try another search.</h2>
    // </div>
