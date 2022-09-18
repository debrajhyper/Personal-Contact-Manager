import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SkeletonTheme } from 'react-loading-skeleton';

import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import './sass/index.scss';
import './sass/skeleton.scss';
import './sass/variables.scss';
import './sass/responsive.scss';

import App from './App.js';
import store from './services/store';

ReactDOM.render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#e5e5e5" highlightColor="#ffffff">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>,
  document.getElementById('root')
);