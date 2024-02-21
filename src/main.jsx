import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Nav from './components/Nav.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Nav />
  </React.StrictMode>
);
