import reportWebVitals from './reportWebVitals';
import store from "./Components/redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {RootStateType} from "./Components/redux/store";

export let reRenderEntireTree = (state: RootStateType) => { //what state&state type???

    ReactDOM.render(
        <BrowserRouter>
            <App dispatch={store.dispatch.bind(store)}
                 store={store}/>
        </BrowserRouter>,
        document.getElementById('root')
    );

}

reportWebVitals();

reRenderEntireTree(store.getState())

store.subscribe(() => {
    let state = store.getState()
    reRenderEntireTree(state)
})

reportWebVitals();
