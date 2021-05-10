import React, { useContext } from 'react'
import { MoviesContext } from '../contexts/MoviesContextHandler'; 
import { useMediaQuery } from 'react-responsive' 

function Notification() {
    const { numOfNominations } = useContext(MoviesContext);

    const isSmallScreen = useMediaQuery({ query: '(min-width: 420px)' })

    return (
        <>
            {numOfNominations === 5 && (<div className="notifications card">
                <div className="max-nominations">Congratulations! You nominated 5 movies. {isSmallScreen && "See you at the awards 🎉"}</div>
            </div>)}
        </>
    )
}

export default Notification
