import React, {useContext} from 'react'
import { MoviesContext } from '../contexts/MoviesContextHandler'; 

function Search() {
    const {searchText, setSearchText, setResults} = useContext(MoviesContext);

    const onChangeHandler = async (val) => {
        setResults([]); 
        setSearchText(val); 
    }

    return (
        <div className="search-container">
            <i className="fa fa-search" aria-hidden="true"></i>
            <input onChange={(e) => onChangeHandler(e.target.value)} value={searchText} autoComplete="off" className="input-search" id="search" type="search" placeholder="Search for a movie..." autoFocus />
        </div>
    )
}

export default Search
