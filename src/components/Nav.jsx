import {useNavigate} from "react-router-dom";
import { IconContext } from "react-icons";
import { MdSearch } from "react-icons/md";

function Nav(props) {
    // destructure props
    const {heading, subheading, path, inputValue, handleChange, handleSubmit, searchbar} = props
    //to navigate to another page
    let navigate = useNavigate();

    return (
        <nav className="nav">
            <h1 className="nav-title">{heading}</h1>
            <a className="nav-link" onClick={() => navigate(path)} >{subheading}</a>
            
            {searchbar 
            &&
            <form className="searchbar" onSubmit={handleSubmit}>
                <IconContext.Provider value={{className: "searchbar-icon"}}>
                    <MdSearch />
                </IconContext.Provider>
                <input className="searchbar-input" type="text" placeholder="Search for a movie" value={inputValue} onChange={handleChange} />
                <button className="searchbar-btn" type="submit">Search</button>
            </form>}
        </nav>
    )
}

export default Nav