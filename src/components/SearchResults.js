import React, { useContext } from 'react'
import { MoviesContext } from '../contexts/MoviesContextHandler';
import MovieSearchResult from './MovieSearchResult'; 

function SearchResults() {
    const {searchText, results, isLoading, addNomination} = useContext(MoviesContext); 

    return (
        <div className="search-results-container card">
            <center><h3>{searchText === '' ? "Your search results will show up here!" : `Your search results for "${searchText}"`}</h3></center>
            {isLoading ? (<img className="spinner-img" alt="spinner" src="/reload.gif"/>) : results.map((result) => ( 
                <MovieSearchResult key={result.imdbID} result={result} addNomination={addNomination}/> 
            ))} 
        </div>
    )
}

export default SearchResults
