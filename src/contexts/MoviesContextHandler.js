import React, { createContext, useState, useEffect, useRef } from 'react'
import { useToasts } from 'react-toast-notifications';
import axios from 'axios'

export const MoviesContext = createContext()

export const maxNumNominations = 5;

export const MoviesContextProvider = (props) => {

    const [results, setResults] = useState([]);
    const [nominations, setNominations] = useState([]);

    const [searchText, setSearchText] = useState('');

    const [isLoading, setIsLoading] = useState(false)

    const [numOfNominations, setnumOfNominations] = useState(0);

    const maxNomsFlag = useRef(false);

    const { addToast } = useToasts();

    const {REACT_APP_OMDB_API_KEY} = process.env;

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);

            const result = await axios(`https://www.omdbapi.com/?s="${searchText}"&type=movie&apikey=${REACT_APP_OMDB_API_KEY}`);

            if (result.data.Error) {
                setResults([]);
            } else {
                let allMoviesFound = []

                for (let i = 0; i < result.data.Search.length; i++) {
                    const movieID = result.data.Search[i].imdbID;

                    const moreInfo = await axios(`https://www.omdbapi.com/?i=${movieID}&apikey=${REACT_APP_OMDB_API_KEY}`);
                    
                    // shorten the string
                    const maxLength = 50;
                    let newTitle = "";
                    if(moreInfo.data.Title.length >= maxLength) {
                        newTitle = moreInfo.data.Title.substring(0, maxLength).trim() + "...";
                    } else {
                        newTitle = moreInfo.data.Title;
                    } 

                    let newObject = {
                        imdbID: movieID,
                        Poster: moreInfo.data.Poster,
                        Title: newTitle,
                        Year: moreInfo.data.Year,
                        Runtime: moreInfo.data.Runtime,
                        Genres: moreInfo.data.Genre.split(','),
                        Plot: moreInfo.data.Plot,
                        disabled: false
                    } 

                    const nomAlreadyExists = nominations.some(nomination => nomination.imdbID === newObject.imdbID)

                    // omdb api has duplicate entries which causes key conflicts
                    const duplicateKey = allMoviesFound.some(movie => movie.imdbID === newObject.imdbID)

                    if (!nomAlreadyExists && !duplicateKey) {
                        allMoviesFound.push(newObject)
                    }
                }
                setResults(allMoviesFound);
            }
            setIsLoading(false);
        }

        const timeOutId = setTimeout(() => fetchItems(), 500);

        // clean up
        return () => clearTimeout(timeOutId);

    }, [searchText])

    // grab data from local storage on mount
    useEffect(() => {
        const data = localStorage.getItem('nominations');
        if(data) {
            setNominations(JSON.parse(data));
        }

        const numNoms = localStorage.getItem('numNominations');
        if(numNoms) {
            setnumOfNominations(parseInt(numNoms));

            if(numNoms >= maxNumNominations) {
                maxNomsFlag.current = true;
            }
        }

    }, [])

    // save to local storage
    useEffect(() => {
        localStorage.setItem('nominations', JSON.stringify(nominations))
        localStorage.setItem('numNominations', numOfNominations);
    }, [nominations])

    const setNominateBtnDisabled = (id, isDisabled) => {
        const index = results.findIndex(result => result.imdbID === id);

        if (index !== -1) {
            // create a shallow copy of the objects
            let tempResults = [...results];
            // the item we will modify
            let item = tempResults[index];
            item.disabled = isDisabled;
            tempResults[index] = item;
            setResults(tempResults);
        }
    }

    const addNomination = (id) => {
        if (maxNomsFlag.current === true) {
            addToast(`You already have ${maxNumNominations} nominations!`, {
                appearance: 'info',
                autoDismiss: true,
            });
        } else {
            const item = results.find(searchResult => searchResult.imdbID === id);
            const newArray = [item, ...nominations]
            setNominations(newArray);
            setNominateBtnDisabled(id, true);
            setnumOfNominations(prevState => prevState + 1); 

            if (newArray.length >= maxNumNominations) {
                addToast(`Awesome! You nominated ${maxNumNominations} movies.`, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                maxNomsFlag.current = true;
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } else {
                addToast('Added nomination', {
                    appearance: 'info',
                    autoDismiss: true,
                });
            }
        }
    }

    const removeNomination = (id) => {
        const newNominations = nominations.filter(nomination => nomination.imdbID !== id)
        setNominations(newNominations);
        setNominateBtnDisabled(id, false);
        setnumOfNominations(prevState => prevState - 1);
        addToast('Removed nomination', {
            appearance: 'error',
            autoDismiss: true,
        });
        maxNomsFlag.current = false;
    }

    return <MoviesContext.Provider value={{ results, setResults, nominations, setNominations, searchText, setSearchText, isLoading, addNomination, removeNomination, numOfNominations }}>
        {props.children}
    </MoviesContext.Provider>
}

export default MoviesContextProvider;