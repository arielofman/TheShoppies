import React, {useContext} from 'react'
import { MoviesContext } from '../contexts/MoviesContextHandler'; 
import { motion } from "framer-motion"

function Search() {
    const {searchText, setSearchText, setResults} = useContext(MoviesContext);

    const onChangeHandler = async (val) => {
        setResults([]); 
        setSearchText(val); 
    }

    return (
        <motion.div className="search-container" key={"search-bar"}
        initial={{ width: '20%' }}
        animate={{ width: '100%', transition: {
            duration: 1.3
          }} }>
            <i className="fa fa-search" aria-hidden="true"></i>
            <input onChange={(e) => onChangeHandler(e.target.value)} value={searchText} autoComplete="off" className="input-search" id="search" type="search" placeholder="Search for a movie..." autoFocus />
        </motion.div>
    )
}

export default Search
