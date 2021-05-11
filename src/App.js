import React from 'react'

import './App.css';

import Header from './components/Header';
import Nominations from './components/Nominations';
import Notification from './components/Notification';
import SearchResults from './components/SearchResults';
import MoviesContextProvider from './contexts/MoviesContextHandler';

import { ToastProvider } from 'react-toast-notifications';

import { motion } from "framer-motion"

function App() {
  return (
    <ToastProvider placement="bottom-center" autoDismissTimeout={2000}>
      <MoviesContextProvider>
        <div className="container">
          <div className="wrapper">
            <Header />
            <Notification />
            <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.5 } }}
                             className="main">
              <SearchResults />
              <Nominations />
            </motion.div>
            <div className="footer">
              <div id="footer-label">Developed by <a id="footer-link" href="https://github.com/arielofman"><span id="credits">Ariel Ofman</span></a></div>
            </div>
          </div>
        </div>
      </MoviesContextProvider>
    </ToastProvider>
  );
}

export default App;
