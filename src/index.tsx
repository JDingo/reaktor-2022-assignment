import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  // Strict mode causes rendering twice, which causes games to increment by two when they finish
  <React.StrictMode> 
    <App />,
  </React.StrictMode>,
  document.getElementById('root')
);