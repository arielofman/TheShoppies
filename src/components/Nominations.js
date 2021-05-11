import React, { useContext } from 'react'
import { MoviesContext, maxNumNominations } from '../contexts/MoviesContextHandler';

import Nomination from './Nomination'; 

function Nominations() {
    const { nominations, removeNomination } = useContext(MoviesContext);  
    
    return (
        <div className="nominations card">
            <center><h3>{nominations.length === 0 ? "Nominate a movie to get started." : `Nominations (${nominations.length}/${maxNumNominations}):`}</h3></center>
            
            {nominations.map((result) => (  
                <Nomination key={result.imdbID} result={result} removeNomination={removeNomination} /> 
            ))}  
        </div>
    )
}

export default Nominations
