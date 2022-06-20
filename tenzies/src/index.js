import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <div className="die-face-test">
     <div className="die-num num-1"></div>
     <div className="die-num num-2"></div>
     <div className="die-num num-3"></div>
     <div className="die-num num-4"></div>
     <div className="die-num num-5"></div>
     <div className="die-num num-6"></div>
     <div className="die-num num-7"></div>
     <div className="die-num num-8"></div>
     <div className="die-num num-9"></div>
    </div> */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
