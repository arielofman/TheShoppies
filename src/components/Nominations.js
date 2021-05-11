import React, { useContext } from 'react'
import { MoviesContext, maxNumNominations } from '../contexts/MoviesContextHandler';
import { motion, AnimatePresence } from "framer-motion"
import Nomination from './Nomination';

function Nominations() {
    const { nominations, removeNomination } = useContext(MoviesContext);

    const variants = {
        initial: { scale: 0 },
        animate: {
          scale: [1, 2, 1, 3, 1],
          transition: {
            delay: 0.2
          }
        }
      };

    function renderTotalNoms() { 
        let animatedJsx = (<>Nominations (<motion.div style={{display: 'inline-block'}} key={nominations.length} variants={variants}
        initial="initial"
        animate={"animate"}
        >{`${nominations.length}`}</motion.div>/{maxNumNominations})</>)
        return (animatedJsx);
    }

    return (
        <div className="nominations card">
            <center><h3>{nominations.length === 0 ? "Nominate a movie to get started." : renderTotalNoms()}</h3></center>
            <AnimatePresence> 
                {nominations.map((result) => (
                    <motion.div key={result.imdbID}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 1 } }}
                        exit={{ opacity: 0, transition: { duration: 0.7 }  }}>
                        <Nomination  result={result} removeNomination={removeNomination} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default Nominations
