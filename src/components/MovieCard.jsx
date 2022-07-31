import { IconContext } from "react-icons";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import star from "../assets/Icon.png";

function MovieCard(props) {
    //destructure props
    const {Title, imdbRating, Runtime, Genre, Plot, Poster, Response, id, toAdd, addMovie, removeMovie} = props;

    return Response === "True" ? (
        <div className="movie-card">
            <div className="movie-card-aside">
                <img className="movie-card-image" src={Poster} alt="movie poster"/>
            </div>

            <div className="movie-card-content">
                <div className="movie-card-heading">
                    <h2 className="movie-card-title">{Title}</h2>
                    <div className="movie-card-rating">
                        <img src={star} alt="star icon" />
                        <h4>{imdbRating}</h4>
                    </div>
                </div>
                
                <div className="movie-card-subheading">
                    <h4>{Runtime}</h4>
                    <h4>{Genre}</h4>
                    {toAdd ?               
                        <div className="movie-card-action" onClick={() => addMovie(id)}>
                            <IconContext.Provider value={{className: "movie-card-action-icon"}}>
                                <MdAddCircle />
                            </IconContext.Provider>
                            <h4>Watchlist</h4>
                        </div>
                        :
                        <div className="movie-card-action" onClick={() => removeMovie(id)}>
                            <IconContext.Provider value={{className: "movie-card-action-icon"}}>
                                <MdRemoveCircle />
                            </IconContext.Provider>
                            <h4>Remove</h4>
                    </div>
                
                    }

                </div>

                <div className="movie-card-description">{Plot}</div>
            </div>
        </div>
    )
    :
    (
        <div className="search-error">
            <h2>Unable to find what you're looking for. Please try another search.</h2>
        </div>
    )
}

export default MovieCard