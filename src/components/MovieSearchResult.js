import React from 'react'
import Genre from './Genre'
import {v4 as uuid} from 'uuid'

function MovieSearchResult({result, addNomination }) {
    return (
        <div className="entry"> 
            <div className="img-container"><img alt={result.title} src={result.Poster === "N/A" ? "/no-cover.png" : result.Poster} /></div>
            <div className="entry-data">
                <div className="title">{result.Title} ({result.Year})</div>
                <div className="runtime">{result.Runtime !== "N/A" && result.Runtime}</div> 
                <div className="genre-container">
                    {result.Genres.map((genre) => genre !== "N/A" && (<Genre key={uuid()} genre={genre}/>)
                    )}
                </div>
                <div className="about">{result.Plot === "N/A" ? "There is currently no information on the plot of this movie." : result.Plot}</div>
                <button disabled={result.disabled} onClick={() => addNomination(result.imdbID)} className="nominate-btn">Nominate <i className="fas fa-trophy"></i></button>
            </div>
        </div> 
    )
}

export default MovieSearchResult
