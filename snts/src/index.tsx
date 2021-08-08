import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state from "./Components/redux/state";


ReactDOM.render(
  <React.StrictMode>
    <App profilePage={state.profilePage} sideBar={state.sideBar} dialogsPage={state.dialogsPage}/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
