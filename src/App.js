import React from 'react'

import './App.css';

import Header from './components/Header';
import Nominations from './components/Nominations';
import Notification from './components/Notification';
import SearchResults from './components/SearchResults';
import MoviesContextProvider from './contexts/MoviesContextHandler';

import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <ToastProvider placement="bottom-center" autoDismissTimeout={2000}>
      <MoviesContextProvider>
        <div className="container">
          <div className="wrapper">
            <Header />
            <Notification />
            <div className="main">
              <SearchResults />
              <Nominations />
            </div>
            <div className="footer">
              <div id="footer-label">Developed by <a id="footer-link" href="https://github.com/ericofman"><span id="credits">Ariel Ofman</span></a></div>
            </div>
          </div>
        </div>
      </MoviesContextProvider>
    </ToastProvider>
  );
}

export default App;
