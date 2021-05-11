import { motion, AnimatePresence } from "framer-motion"
import React, { useContext } from 'react'
import { MoviesContext } from '../contexts/MoviesContextHandler';
import MovieSearchResult from './MovieSearchResult';

function SearchResults() {
    const { searchText, results, isLoading, addNomination } = useContext(MoviesContext);

    return (
        <div className="search-results-container card">
            <center><h3>{searchText === '' ? "Your search results will show up here!" : `Your search results for "${searchText}"`}</h3></center>
            {isLoading ? (<img className="spinner-img" alt="spinner" src="/reload.gif" />) :

                (<AnimatePresence>
                    {results.map((result) => (
                        <motion.div key={result.imdbID}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 1 } }}
                            exit={{ opacity: 0 }}
                        >
                            <MovieSearchResult result={result} addNomination={addNomination} />
                        </motion.div>
                    ))}</AnimatePresence>)}
        </div>
    )
}

export default SearchResults
