import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Game from './Game.jsx';
import End from './End.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/end" element={<End/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);