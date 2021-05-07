import React, { useContext } from 'react'
import { MoviesContext } from '../contexts/MoviesContextHandler'; 

function Notification() {
    const { numOfNominations } = useContext(MoviesContext);

    return (
        <>
            {numOfNominations === 5 && (<div className="notifications card">
                <div className="max-nominations">Congratulations! You nominated 5 movies. See you at the awards. 🎉</div>
            </div>)}
        </>
    )
}

export default Notification
